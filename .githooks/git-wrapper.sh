#!/bin/sh
# Git 包装脚本：供 VS Code 通过 git.path 配置使用
# push 成功后自动同步父仓库 Lab 的子模块指针

REAL_GIT="/usr/bin/git"

# 执行真实 git 命令
"$REAL_GIT" "$@"
_exit=$?

# 仅在 push 成功时触发同步
if [ "$1" = "push" ] && [ $_exit -eq 0 ]; then
  _toplevel=$("$REAL_GIT" rev-parse --show-toplevel 2>/dev/null)
  _hook="$_toplevel/../../.githooks/submodule/post-push"
  if [ -f "$_hook" ]; then
    sh "$_hook"
  fi
fi

exit $_exit
