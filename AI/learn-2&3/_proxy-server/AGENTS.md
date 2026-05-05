# Proxy Server 工程说明

## 项目简介

这是一个基于 Node.js 的 HTTP/HTTPS 代理服务器，使用 `http-proxy` 库实现，支持 WebSocket 协议。

## 核心功能

1. **请求转发**：将所有接收到的 HTTP/HTTPS 请求转发到目标服务器
2. **WebSocket 支持**：完整支持 WebSocket 协议升级和双向通信
3. **日志记录**：每个请求/响应对保存为独立的文本日志文件
4. **日志管理**：最多保留 20 个日志文件，超出时自动删除最旧的

## 技术栈

- **核心库**：`http-proxy` (^1.18.1)
- **运行环境**：Node.js
- **依赖数量**：仅 1 个生产依赖

## 关键配置

### 环境变量

| 变量名 | 必需 | 默认值 | 说明 |
|--------|------|--------|------|
| `TARGET_URL` | **是** | - | 目标服务器地址，如 `http://localhost:8080` |
| `PORT` | 否 | 3000 | 代理服务器监听端口 |
| `LOG_DIR` | 否 | ./logs | 日志文件存储目录（自动创建） |
| `LOG_LEVEL` | 否 | info | 控制台日志级别：error/warn/info/debug |

### 启动方式

```bash
# 基础启动
TARGET_URL=http://example.com npm start

# 带完整配置
TARGET_URL=http://example.com PORT=8080 LOG_DIR=./logs LOG_LEVEL=debug npm start
```

## 文件结构

```
proxy-server/
├── index.js          # 主程序入口
├── package.json      # 项目配置和依赖
├── .env.example      # 环境变量示例
├── .gitignore        # Git 忽略规则
└── logs/             # 日志目录（运行时创建）
```

## 日志系统

### 日志文件命名
```
request-YYYY-MM-DD-HHmmss-UUID.log
```

### 日志内容格式
- 请求时间
- 请求ID
- 请求方法、URL、Headers、Body
- 响应状态码、Headers、Body
- 请求耗时

### 日志保留策略
- 最大保留数量：20 个文件
- 超出时删除最旧的文件（按修改时间排序）

## 错误处理

- 目标服务器不可用时返回 **502 Bad Gateway**
- 请求/响应 Body 最大支持内存存储（适合中小型请求）
- WebSocket 连接失败时优雅关闭

## 开发命令

```bash
npm install    # 安装依赖
npm start      # 启动服务
npm run dev    # 开发模式（nodemon）
```

## 注意事项

1. **必须设置 `TARGET_URL`**，否则服务无法启动
2. 日志目录会在首次启动时自动创建
3. 所有请求和响应内容都会被完整记录到日志文件
4. WebSocket 日志格式与 HTTP 日志略有不同，会单独标记

## 测试示例

```bash
# 1. 启动代理到 httpbin.org
TARGET_URL=https://httpbin.org npm start

# 2. 测试 HTTP 请求
curl http://localhost:3000/get
curl -X POST http://localhost:3000/post -d '{"test": true}' -H "Content-Type: application/json"

# 3. 测试 WebSocket
# 使用 wscat 或其他 WebSocket 客户端连接 ws://localhost:3000
```
