#!/bin/sh
# 初始化本地 git 包装与 VS Code 配置
# 克隆仓库后执行一次: sh scripts/setup-hooks.sh
#
# 目标：
# 1. 终端里的 git push 成功后，若当前位于子模块，则自动同步 Wiki 父仓库
# 2. VS Code Source Control 使用仓库内的 git-wrapper.sh，从而具备同样能力
# 3. 安装 pre-push 钩子：push 前 review 知识库同步状态（只报告、不阻断）

set -e

REPO_ROOT=$(cd "$(dirname "$0")/.." && pwd)
ZSHRC="$HOME/.zshrc"
HOOK_SCRIPT="$REPO_ROOT/.githooks/submodule/post-push"
WRAPPER_SCRIPT="$REPO_ROOT/.githooks/git-wrapper.sh"
PRE_PUSH_SCRIPT="$REPO_ROOT/.githooks/pre-push"
REVIEW_SCRIPT="$REPO_ROOT/.githooks/knowledge-base-review.sh"
BEGIN_MARKER="# >>> Wiki submodule post-push sync <<<"
END_MARKER="# <<< Wiki submodule post-push sync <<<"
SHELL_BLOCK=$(cat <<EOF
$BEGIN_MARKER
# 统一走仓库内的 git wrapper，确保终端与 VS Code 的触发逻辑一致
git() {
  "$WRAPPER_SCRIPT" "\$@"
}
$END_MARKER
EOF
)

ensure_zsh_wrapper() {
  echo ">>> 检查 ~/.zshrc 是否已配置..."

  if [ ! -f "$ZSHRC" ]; then
    : > "$ZSHRC"
  fi

  TMP_ZSHRC=$(mktemp "${TMPDIR:-/tmp}/wiki-zshrc.XXXXXX")
  if grep -q "submodule post-push sync" "$ZSHRC" 2>/dev/null; then
    awk '
      BEGIN {
        inside = 0
      }
      $0 ~ /^# >>> .* submodule post-push sync <<</ {
        inside = 1
        next
      }
      $0 ~ /^# <<< .* submodule post-push sync <<</ {
        inside = 0
        next
      }
      !inside {
        print
      }
    ' "$ZSHRC" > "$TMP_ZSHRC"
    cat >> "$TMP_ZSHRC" << EOF

$SHELL_BLOCK
EOF
    mv "$TMP_ZSHRC" "$ZSHRC"
    echo ">>> 已更新 ~/.zshrc 包装配置。"
    return
  fi

  cat >> "$ZSHRC" << EOF

$SHELL_BLOCK
EOF
  rm -f "$TMP_ZSHRC"
  echo ">>> 已写入 ~/.zshrc"
}

ensure_vscode_git_path() {
  SETTINGS_FILE="$1"
  mkdir -p "$(dirname "$SETTINGS_FILE")"

  if [ ! -f "$SETTINGS_FILE" ] || [ ! -s "$SETTINGS_FILE" ]; then
    cat > "$SETTINGS_FILE" << EOF
{
  "git.path": "$WRAPPER_SCRIPT"
}
EOF
    echo ">>> 已创建 VS Code 设置并写入 git.path: $SETTINGS_FILE"
    return
  fi

  TMP_SETTINGS=$(mktemp "${TMPDIR:-/tmp}/wiki-vscode-settings.XXXXXX")
  if grep -q '"git\.path"[[:space:]]*:' "$SETTINGS_FILE"; then
    awk -v wrapper="$WRAPPER_SCRIPT" '
      BEGIN {
        replaced = 0
      }
      /"git\.path"[[:space:]]*:/ && !replaced {
        match($0, /^[[:space:]]*/)
        indent = substr($0, 1, RLENGTH)
        if (indent == "") {
          indent = "  "
        }
        print indent "\"git.path\": \"" wrapper "\","
        replaced = 1
        next
      }
      {
        print
      }
    ' "$SETTINGS_FILE" > "$TMP_SETTINGS"
  else
    awk -v wrapper="$WRAPPER_SCRIPT" '
      BEGIN {
        inserted = 0
      }
      !inserted && $0 ~ /^[[:space:]]*{/ {
        print
        print "  \"git.path\": \"" wrapper "\","
        inserted = 1
        next
      }
      {
        print
      }
    ' "$SETTINGS_FILE" > "$TMP_SETTINGS"
  fi
  mv "$TMP_SETTINGS" "$SETTINGS_FILE"
  echo ">>> 已更新 VS Code git.path: $SETTINGS_FILE"
}

configure_vscode_settings() {
  UPDATED_ANY=0

  case "$(uname -s)" in
    Darwin)
      for SETTINGS_FILE in \
        "$HOME/Library/Application Support/Code/User/settings.json" \
        "$HOME/Library/Application Support/Code - Insiders/User/settings.json" \
        "$HOME/Library/Application Support/VSCodium/User/settings.json"
      do
        if [ -f "$SETTINGS_FILE" ] || [ -d "$(dirname "$SETTINGS_FILE")" ]; then
          ensure_vscode_git_path "$SETTINGS_FILE"
          UPDATED_ANY=1
        fi
      done

      if [ "$UPDATED_ANY" -eq 0 ]; then
        ensure_vscode_git_path "$HOME/Library/Application Support/Code/User/settings.json"
      fi
      ;;
    Linux)
      for SETTINGS_FILE in \
        "$HOME/.config/Code/User/settings.json" \
        "$HOME/.config/Code - Insiders/User/settings.json" \
        "$HOME/.config/VSCodium/User/settings.json"
      do
        if [ -f "$SETTINGS_FILE" ] || [ -d "$(dirname "$SETTINGS_FILE")" ]; then
          ensure_vscode_git_path "$SETTINGS_FILE"
          UPDATED_ANY=1
        fi
      done

      if [ "$UPDATED_ANY" -eq 0 ]; then
        ensure_vscode_git_path "$HOME/.config/Code/User/settings.json"
      fi
      ;;
    *)
      echo ">>> 当前系统未内置 VS Code 设置自动写入，请手动将 git.path 指向: $WRAPPER_SCRIPT"
      ;;
  esac
}

ensure_pre_push_hook() {
  echo ">>> 安装 pre-push 钩子（知识库 review）..."

  HOOKS_DIR=$(cd "$REPO_ROOT" && git rev-parse --git-path hooks)
  case "$HOOKS_DIR" in
    /*) ;;
    *) HOOKS_DIR="$REPO_ROOT/$HOOKS_DIR" ;;
  esac
  mkdir -p "$HOOKS_DIR"
  TARGET="$HOOKS_DIR/pre-push"

  # 不用 core.hooksPath：那会让整个 .git/hooks 目录失效，
  # 连带停掉 yorkie / git-lfs 已经装好的其他钩子。改为装一层 shim。
  if [ -f "$TARGET" ] && ! grep -q "githooks/pre-push" "$TARGET" 2>/dev/null; then
    cp "$TARGET" "$TARGET.pre-kb-review.bak"
    echo ">>> 已备份原 pre-push 到 $TARGET.pre-kb-review.bak"
  fi

  cat > "$TARGET" << 'HOOK_EOF'
#!/bin/sh
# 由 scripts/setup-hooks.sh 生成的 shim —— 真实逻辑在受版本控制的 .githooks/pre-push
# （知识库 review + git-lfs 串联；改逻辑改那个文件即可，无需重跑 setup）
ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
[ -n "$ROOT" ] && [ -f "$ROOT/.githooks/pre-push" ] || exit 0
exec sh "$ROOT/.githooks/pre-push" "$@"
HOOK_EOF
  chmod +x "$TARGET"
  echo ">>> pre-push 已安装: $TARGET"
}

ensure_zsh_wrapper

chmod +x "$HOOK_SCRIPT"
chmod +x "$WRAPPER_SCRIPT"
chmod +x "$PRE_PUSH_SCRIPT"
chmod +x "$REVIEW_SCRIPT"
echo ">>> git 包装脚本已就绪: $WRAPPER_SCRIPT"

ensure_pre_push_hook

configure_vscode_settings

# v8 仓库极大，fetch 时不拉取 tags，避免 pullBeforePush 时等待过久
if [ -d "$REPO_ROOT/JS/V8engine-source" ]; then
  cd "$REPO_ROOT/JS/V8engine-source"
  git config remote.origin.tagOpt --no-tags
  echo ">>> 已配置 JS/V8engine-source fetch 不拉取 tags"
fi

echo ">>> 完成！请重新打开终端，或执行: source ~/.zshrc"
echo ">>> 然后重载 VS Code 窗口（Cmd+Shift+P -> Reload Window）使 git.path 生效。"
echo ">>> 之后在任意 Wiki 子模块中通过终端或 VS Code Source Control 执行 git push，都将自动同步 Wiki 父仓库。"
