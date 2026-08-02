#!/bin/sh
# ---------------------------------------------------------------------------
# 知识库同步 review
#
# 用途：push 前检查「本次要推送的改动」有没有反映进 OpenViking 知识库。
#
# 只报告，不阻断。理由：ingest 是 LLM 作业（要 embedding + VLM API，分钟级 +
# 花钱），修复成本高。硬拦只会逼出 --no-verify 的肌肉记忆，届时连报告都看不到。
#
# 判据全部来自 docs/openviking/ingest-manifest.tsv 的白名单与排除规则，
# 不依赖 OpenViking CLI —— CLI 没装也能跑出完整报告。
#
# 手动运行：
#   sh .githooks/knowledge-base-review.sh            # 检查所有未推送的提交
#   sh .githooks/knowledge-base-review.sh A..B       # 检查指定范围
#   sh .githooks/knowledge-base-review.sh --staged   # 检查暂存区
#
# 作为 pre-push 钩子运行时，从 stdin 读 <local ref> <local sha> <remote ref> <remote sha>。
# ---------------------------------------------------------------------------

set -u

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
MANIFEST="$REPO_ROOT/docs/openviking/ingest-manifest.tsv"

# 没有 manifest 就没有判据，静默退出（比如在别的仓库里误装了钩子）
[ -f "$MANIFEST" ] || exit 0

TMPDIR_KB=$(mktemp -d "${TMPDIR:-/tmp}/kb-review.XXXXXX") || exit 0
trap 'rm -rf "$TMPDIR_KB"' EXIT INT TERM

CHANGED="$TMPDIR_KB/changed"
: > "$CHANGED"

ZERO="0000000000000000000000000000000000000000"

# --- 收集本次涉及的文件 ------------------------------------------------------

collect_range() {
  # $1 = rev-range 或单个 rev
  git -c core.quotePath=false diff --name-only --diff-filter=ACMRT "$@" 2>/dev/null >> "$CHANGED"
}

MODE_DESC=""

if [ "$#" -gt 0 ]; then
  case "$1" in
    --staged)
      MODE_DESC="暂存区"
      git -c core.quotePath=false diff --cached --name-only --diff-filter=ACMRT >> "$CHANGED" 2>/dev/null
      ;;
    *)
      MODE_DESC="范围 $1"
      collect_range "$1"
      ;;
  esac
elif [ -t 0 ]; then
  # 手动运行且没给参数：所有还没进任何远端的提交
  MODE_DESC="未推送的提交"
  RANGE_REVS=$(git rev-list HEAD --not --remotes 2>/dev/null | tail -1)
  if [ -n "$RANGE_REVS" ]; then
    collect_range "${RANGE_REVS}^..HEAD" 2>/dev/null || collect_range HEAD
  fi
else
  # pre-push：从 stdin 读要推送的 ref
  MODE_DESC="本次推送"
  while read -r _local_ref local_sha _remote_ref remote_sha; do
    [ -z "${local_sha:-}" ] && continue
    [ "$local_sha" = "$ZERO" ] && continue   # 删除分支，无内容可查
    if [ "${remote_sha:-$ZERO}" = "$ZERO" ]; then
      # 新分支：取所有还没进任何远端的提交
      OLDEST=$(git rev-list "$local_sha" --not --remotes 2>/dev/null | tail -1)
      if [ -n "$OLDEST" ]; then
        collect_range "${OLDEST}^..${local_sha}" 2>/dev/null || collect_range "$local_sha"
      fi
    else
      collect_range "${remote_sha}..${local_sha}"
    fi
  done
fi

sort -u "$CHANGED" -o "$CHANGED"
[ -s "$CHANGED" ] && [ -n "$(cat "$CHANGED")" ] || exit 0

# --- 子模块路径清单（用于「子模块内容变了，入口文件可能过期」判断）-------------

SUBMODULES="$TMPDIR_KB/submodules"
git ls-files --stage 2>/dev/null | awk '$1 == "160000" { $1=""; $2=""; $3=""; sub(/^[ \t]+/, ""); print }' > "$SUBMODULES"

# --- 分类 -------------------------------------------------------------------

awk -v manifest="$MANIFEST" -v subs="$SUBMODULES" '
function strip_slash(s) { sub(/\/$/, "", s); return s }

function is_excluded(p,   i, e) {
  for (i = 1; i <= n_excl; i++) {
    e = excl[i]
    if (p == e || index(p, e "/") == 1) return 1
  }
  return 0
}

function covered_by(p,   i, d, g, base, suffix) {
  if (p in fileent) return "file"
  for (i = 1; i <= n_dir; i++) {
    d = dirent[i]
    if (p == d || index(p, d "/") == 1) return "dir"
  }
  for (i = 1; i <= n_glob; i++) {
    g = globent[i]
    if (index(g, "/**/") > 0) {
      base = substr(g, 1, index(g, "/**/") - 1)
      suffix = substr(g, index(g, "/**/") + 4)
      if (index(p, base "/") == 1 && p ~ ("/" suffix "$")) return "glob"
    } else if (p ~ ("^" g "$")) {
      return "glob"
    }
  }
  return ""
}

BEGIN {
  FS = "\t"
  n_excl = 0; n_dir = 0; n_glob = 0; n_entries = 0

  while ((getline line < manifest) > 0) {
    if (line ~ /^#/ || line ~ /^[ \t]*$/) continue
    split(line, f, "\t")
    kind = f[1]; path = strip_slash(f[2])
    if (path == "") continue
    if (kind == "exclude")   excl[++n_excl] = path
    else if (kind == "file") { fileent[path] = 1; entries[++n_entries] = path }
    else if (kind == "dir")  { dirent[++n_dir] = path; entries[++n_entries] = path }
    else if (kind == "glob") { globent[++n_glob] = path }
  }
  close(manifest)

  n_subs = 0
  while ((getline line < subs) > 0) {
    if (line == "") continue
    submods[++n_subs] = strip_slash(line)
  }
  close(subs)

  FS = "\n"
}

{
  p = $0
  if (p == "") next
  if (is_excluded(p)) next

  # manifest 本身被改了 —— 白名单变化，建议全量重跑
  if (p == "docs/openviking/ingest-manifest.tsv") manifest_changed = 1

  hit = covered_by(p)
  if (hit != "") {
    stale[++n_stale] = p
    next
  }

  # 是子模块指针变更？找出该子模块下已登记的入口文件
  for (i = 1; i <= n_subs; i++) {
    if (p == submods[i]) {
      for (j = 1; j <= n_entries; j++) {
        if (index(entries[j], p "/") == 1) sub_stale[++n_sub_stale] = entries[j] "  （子模块 " p " 内容已变）"
      }
      matched_sub = 1
      break
    }
  }
  if (matched_sub) { matched_sub = 0; next }

  # 未登记的知识内容：只管 md，避免源码噪声
  if (p ~ /\.md$/) unlisted[++n_unlisted] = p
}

END {
  if (n_stale == 0 && n_sub_stale == 0 && n_unlisted == 0) {
    print "✓ 知识库 review：本次改动均已被 ingest-manifest 覆盖或排除"
    exit 0
  }

  print ""
  print "⚠ OpenViking 知识库同步 review"
  print ""

  if (n_stale > 0) {
    printf "  在 ingest 白名单内、本次有改动 —— 需重跑 ingest（%d）：\n", n_stale
    for (i = 1; i <= n_stale; i++) print "      " stale[i]
    print ""
  }

  if (n_sub_stale > 0) {
    printf "  子模块内容变动，其已登记入口可能过期（%d）：\n", n_sub_stale
    for (i = 1; i <= n_sub_stale; i++) print "      " sub_stale[i]
    print ""
  }

  if (n_unlisted > 0) {
    printf "  未登记 manifest —— 知识库检索不到（%d）：\n", n_unlisted
    for (i = 1; i <= n_unlisted; i++) print "      " unlisted[i]
    print ""
  }

  if (manifest_changed) {
    print "  ! ingest-manifest.tsv 本身被修改，白名单已变，建议全量重跑。"
    print ""
  }

  print "  修复："
  if (n_stale > 0 || n_sub_stale > 0 || manifest_changed)
    print "      sh scripts/openviking-ingest.sh --wait"
  if (n_unlisted > 0)
    print "      未登记的加进 docs/openviking/ingest-manifest.tsv（file/dir/glob），再跑上面的命令"
  print ""
}
' "$CHANGED"

# 检查 CLI 是否可用，不可用时说明为什么「修复」跑不动
if ! command -v openviking >/dev/null 2>&1 && ! command -v ov >/dev/null 2>&1 && [ -z "${OPENVIKING_BIN:-}" ]; then
  printf '  提示：本机未安装 OpenViking CLI（openviking / ov），上面的修复命令在这台设备上跑不了。\n\n'
fi

# 永远放行
exit 0
