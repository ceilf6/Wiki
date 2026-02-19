#!/bin/sh
# 初始化本地 git hooks 配置
# 克隆仓库后执行一次: sh scripts/setup-hooks.sh

set -e

REPO_ROOT=$(cd "$(dirname "$0")/.." && pwd)

echo ">>> 配置子模块 React/source 的 hooksPath..."

cd "$REPO_ROOT/React/source"

# core.hooksPath 相对于子模块工作目录根，../../.githooks/submodule => Lab/.githooks/submodule
git config core.hooksPath "../../.githooks/submodule"

# 确保 hook 文件有执行权限
chmod +x "$REPO_ROOT/.githooks/submodule/post-push"

echo ">>> 完成！后续在 React/source 执行 git push 会自动同步 Lab 父仓库。"
