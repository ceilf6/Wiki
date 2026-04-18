#!/bin/sh
# Git 包装脚本：供 VS Code 通过 git.path 配置使用
# push 成功后自动同步父仓库 Lab 的子模块指针
# 适用于任意深度的子模块（通过 --show-superproject-working-tree 动态定位父仓库）

REAL_GIT="/usr/bin/git"
LOG="/tmp/git-wrapper.log"
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname "$0")" && pwd)

. "$SCRIPT_DIR/lib/bootstrap-path.sh"
ensure_lab_tool_path

detect_git_subcommand() {
  while [ "$#" -gt 0 ]; do
    case "$1" in
      -c|-C|--exec-path|--git-dir|--work-tree|--namespace|--super-prefix|--config-env)
        shift 2
        continue
        ;;
      --exec-path=*|--git-dir=*|--work-tree=*|--namespace=*|--super-prefix=*|--config-env=*)
        shift
        continue
        ;;
      --help|--version|-p|--paginate|--no-pager|--no-replace-objects|--bare)
        shift
        continue
        ;;
      --)
        shift
        break
        ;;
      -*)
        shift
        continue
        ;;
      *)
        printf '%s\n' "$1"
        return 0
        ;;
    esac
  done

  return 1
}

# 记录所有调用（用于调试）
echo "[$(date '+%H:%M:%S')] args: $*   CWD: $PWD" >> "$LOG"

# 执行真实 git 命令
"$REAL_GIT" "$@"
_exit=$?

_subcommand=$(detect_git_subcommand "$@" 2>/dev/null || true)
echo "[$(date '+%H:%M:%S')] exit=$_exit subcommand=${_subcommand:-unknown}" >> "$LOG"

# 仅在 push 成功时触发同步
if [ "$_subcommand" = "push" ] && [ $_exit -eq 0 ]; then
  _toplevel=$("$REAL_GIT" rev-parse --show-toplevel 2>/dev/null)
  _parent=$("$REAL_GIT" -C "$_toplevel" rev-parse --show-superproject-working-tree 2>/dev/null)
  if [ -n "$_parent" ]; then
    _hook="$_parent/.githooks/submodule/post-push"
    if [ -f "$_hook" ]; then
      echo "[$(date '+%H:%M:%S')] trigger=$_hook top=$_toplevel parent=$_parent" >> "$LOG"
      sh "$_hook"
    fi
  fi
fi

exit $_exit
