#!/bin/sh
# 初始化本地 git 钩子配置
# 克隆仓库后执行一次: sh scripts/setup-hooks.sh
#
# 因 git 不允许 alias 覆盖内置命令（push/commit 等），
# 改用 zsh 函数包装 git，在 React/source push 成功后自动同步父仓库 Lab。

set -e

REPO_ROOT=$(cd "$(dirname "$0")/.." && pwd)
ZSHRC="$HOME/.zshrc"
HOOK_SCRIPT="$REPO_ROOT/.githooks/submodule/post-push"
MARKER="# >>> Lab submodule post-push sync <<<"

echo ">>> 检查 ~/.zshrc 是否已配置..."

if grep -qF "$MARKER" "$ZSHRC" 2>/dev/null; then
  echo ">>> 已存在，跳过写入。"
else
  cat >> "$ZSHRC" << ZSHEOF

$MARKER
# 当在 React/source 子模块中执行 git push 成功后，自动同步父仓库 Lab 的子模块指针
git() {
  command git "\$@"
  local _exit=\$?
  if [ "\$1" = "push" ] && [ \$_exit -eq 0 ]; then
    local _toplevel
    _toplevel=\$(command git rev-parse --show-toplevel 2>/dev/null)
    local _hook="\$_toplevel/../../.githooks/submodule/post-push"
    if [ -f "\$_hook" ]; then
      sh "\$_hook"
    fi
  fi
  return \$_exit
}
# <<< Lab submodule post-push sync <<<
ZSHEOF
  echo ">>> 已写入 ~/.zshrc"
fi

chmod +x "$HOOK_SCRIPT"
chmod +x "$REPO_ROOT/.githooks/git-wrapper.sh"
echo ">>> git 包装脚本已就绪，VS Code 将通过 .vscode/settings.json git.path 自动使用它"

echo ">>> 完成！重新加载 VS Code 窗口（Cmd+Shift+P → Reload Window）即可生效。"
echo ">>> 之后在 React/source 通过侧边栏或终端 git push 都会自动同步 Lab 父仓库。"
