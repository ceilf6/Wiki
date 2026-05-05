#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

PORT=3000
NO_PROXY_VALUE="localhost,127.0.0.1"
LAUNCHER_LOG="$SCRIPT_DIR/logs/start-claude-with-proxy.log"
PROXY_PID=""

cleanup() {
  local exit_code=$?

  trap - EXIT INT TERM

  if [[ -n "$PROXY_PID" ]] && kill -0 "$PROXY_PID" 2>/dev/null; then
    kill "$PROXY_PID" 2>/dev/null || true
    wait "$PROXY_PID" 2>/dev/null || true
  fi

  exit "$exit_code"
}

if ! command -v claude >/dev/null 2>&1; then
  echo "错误: 未找到 claude 命令，请先安装 Claude Code CLI。" >&2
  exit 1
fi

mkdir -p logs
: > "$LAUNCHER_LOG"

trap cleanup EXIT INT TERM

node index.js >>"$LAUNCHER_LOG" 2>&1 &
PROXY_PID=$!

ready=0
for _ in $(seq 1 30); do
  if ! kill -0 "$PROXY_PID" 2>/dev/null; then
    echo "错误: proxy-server 启动失败，请检查 $LAUNCHER_LOG" >&2
    tail -n 20 "$LAUNCHER_LOG" >&2 || true
    exit 1
  fi

  if (: >"/dev/tcp/127.0.0.1/$PORT") 2>/dev/null; then
    ready=1
    break
  fi

  sleep 1
done

if [[ "$ready" -ne 1 ]]; then
  echo "错误: proxy-server 未在 30 秒内就绪，请检查 $LAUNCHER_LOG" >&2
  exit 1
fi

export NO_PROXY="$NO_PROXY_VALUE"
export no_proxy="$NO_PROXY_VALUE"

echo "proxy-server 已启动，日志: $LAUNCHER_LOG"
echo "使用 NO_PROXY/no_proxy=$NO_PROXY_VALUE 启动 Claude Code"

# 不能使用 exec，否则 shell 退出时无法运行 cleanup 来关闭后台 proxy。
claude "$@"
