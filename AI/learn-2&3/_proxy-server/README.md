# Proxy Server

Node.js HTTP/HTTPS 代理服务器，支持 WebSocket，带完整请求/响应日志记录功能。

## 功能特性

- HTTP/HTTPS 请求转发
- WebSocket 协议支持
- 完整的请求/响应日志记录
- 日志文件自动管理（最多保留20个文件）
- 可配置的目标地址和日志目录

## 环境变量

| 变量名 | 必需 | 默认值 | 说明 |
|--------|------|--------|------|
| `TARGET_URL` | 是 | - | 目标服务器地址 |
| `PORT` | 否 | 3000 | 代理服务器监听端口 |
| `LOG_DIR` | 否 | ./logs | 日志文件存储目录 |
| `LOG_LEVEL` | 否 | info | 日志级别 (error/warn/info/debug) |

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，设置 TARGET_URL
```

### 3. 启动服务

```bash
npm start
```

或使用 nodemon 开发模式：

```bash
npm run dev
```

### 4. 直接启动（带环境变量）

```bash
TARGET_URL=http://localhost:8080 npm start
```

## 通过 Claude Code 使用

这台机器的 shell 环境在 [~/.zshrc](/Users/a86198/.zshrc) 中导出了：

- `http_proxy=http://127.0.0.1:7890`
- `https_proxy=http://127.0.0.1:7890`
- `all_proxy=socks5://127.0.0.1:7891`

如果直接从这个环境启动 `claude`，访问 `http://localhost:3000` 的请求可能仍会经过外部代理，表现为 `502 status code (no body)`。

推荐使用下面的命令启动：

```bash
npm run start:claude
```

这个入口会：

- 启动本地 `proxy-server`
- 等待 `127.0.0.1:3000` 就绪
- 仅为新开的 Claude Code 会话设置 `NO_PROXY/no_proxy=localhost,127.0.0.1`
- 保留原有 `http_proxy`、`https_proxy`、`all_proxy`，因此非本地地址仍按现有 Clash 配置走
- 在 Claude Code 退出后自动关闭后台 `proxy-server`

说明：

- 这个入口假设你的 Claude Code 仍然指向 `http://localhost:3000`
- 这个绕行只作用于 `localhost` / `127.0.0.1`
- 启动日志写入 `logs/start-claude-with-proxy.log`

如果仍然需要单独启动代理，继续使用：

```bash
npm start
```

## 日志说明

日志文件保存在 `LOG_DIR` 目录下，文件命名格式：

```
request-0-反向时间排序键-YYYY-MM-DD-HHmmss-UUID.log
```

`反向时间排序键` 用于让文件名按字典序升序排列时，新日志显示在旧日志上面。

每个请求响应保存为一个独立的日志文件，包含：
- 请求方法、URL、Headers、Body
- 响应状态码、Headers、Body
- 请求耗时

Body 日志会同时保留两种形式：

- `decoded body`：按 `content-encoding` 解压后再按 UTF-8 解码，便于直接查看 JSON / SSE 文本。
- `raw body base64`：完整原始字节的 base64，便于在需要时还原上游实际返回内容。

代理转发路径不修改请求或响应，以上处理只发生在日志写入阶段。

**自动清理**：当日志文件超过20个时，会自动删除最旧的文件。

## 示例

```bash
# 启动代理到 httpbin.org
TARGET_URL=https://httpbin.org PORT=3000 npm start

# 测试代理
curl http://localhost:3000/get
```

## License

MIT
