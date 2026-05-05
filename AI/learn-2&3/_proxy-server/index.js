require('dotenv').config();

const http = require('http');
const httpProxy = require('http-proxy');
const fs = require('fs');
const path = require('path');

const TARGET_URL = process.env.TARGET_URL;
const PORT = parseInt(process.env.PORT || '3000', 10);
const LOG_DIR = process.env.LOG_DIR || './logs';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const MAX_LOG_FILES = 20;

if (!TARGET_URL) {
  console.error('错误: 必须设置 TARGET_URL 环境变量');
  process.exit(1);
}

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

function log(level, message) {
  const levelValue = logLevels[level] || logLevels.info;
  const configLevelValue = logLevels[LOG_LEVEL] || logLevels.info;
  
  if (levelValue <= configLevelValue) {
    console.log(`[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`);
  }
}

function generateRequestId() {
  return Math.random().toString(36).substring(2, 15);
}

function getTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function cleanupOldLogs() {
  try {
    const files = fs.readdirSync(LOG_DIR)
      .filter(f => f.startsWith('request-') && f.endsWith('.log'))
      .map(f => ({
        name: f,
        path: path.join(LOG_DIR, f),
        stats: fs.statSync(path.join(LOG_DIR, f))
      }))
      .sort((a, b) => b.stats.mtime - a.stats.mtime);

    if (files.length > MAX_LOG_FILES) {
      const filesToDelete = files.slice(MAX_LOG_FILES);
      filesToDelete.forEach(file => {
        try {
          fs.unlinkSync(file.path);
          log('debug', `已删除旧日志文件: ${file.name}`);
        } catch (err) {
          log('warn', `删除日志文件失败: ${file.name}, 错误: ${err.message}`);
        }
      });
    }
  } catch (err) {
    log('error', `清理日志文件失败: ${err.message}`);
  }
}

function formatHeaders(headers) {
  return Object.entries(headers)
    .map(([key, value]) => `  ${key}: ${value}`)
    .join('\n');
}

function logRequestResponse(reqId, req, reqBody, res, resBody, duration, targetUrl) {
  const timestamp = getTimestamp();
  const filename = `request-${timestamp}-${reqId}.log`;
  const filepath = path.join(LOG_DIR, filename);

  // 直接按 UTF-8 解码，不做任何 base64 转换
  const reqBodyStr = reqBody ? reqBody.toString('utf8') : '';
  const resBodyStr = resBody ? resBody.toString('utf8') : '';

  const logContent = `=================================
转发目标: ${targetUrl}

请求日志
时间: ${new Date().toISOString()}
请求ID: ${reqId}
耗时: ${duration}ms

=== 请求信息 ===
方法: ${req.method}
URL: ${req.url}
协议: ${req.httpVersion}

请求头:
${formatHeaders(req.headers)}

请求体:
${reqBodyStr || '(无)'}

=== 响应信息 ===
状态码: ${res.statusCode}
状态消息: ${res.statusMessage || ''}

响应头:
${formatHeaders(res.headers || {})}

响应体:
${resBodyStr || '(无)'}

=================================
`;

  try {
    fs.writeFileSync(filepath, logContent, 'utf8');
    log('debug', `已保存日志: ${filename}`);
    cleanupOldLogs();
  } catch (err) {
    log('error', `保存日志失败: ${err.message}`);
  }
}

const proxy = httpProxy.createProxyServer({
  target: TARGET_URL,
  changeOrigin: true,
  ws: true,
  secure: false,
  xfwd: false,
  preserveHeaderKeyCase: true
});

const server = http.createServer((req, res) => {
  const reqId = generateRequestId();
  const startTime = Date.now();

  log('info', `→ ${req.method} ${req.url} [${reqId}]`);

  const reqBodyChunks = [];
  const originalWrite = req.write;
  const originalEnd = req.end;

  req.on('data', (chunk) => {
    reqBodyChunks.push(chunk);
  });

  const resBodyChunks = [];
  const resWrite = res.write;
  const resEnd = res.end;

  res.write = function(chunk, encoding) {
    if (chunk) {
      resBodyChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding));
    }
    return resWrite.call(this, chunk, encoding);
  };

  res.end = function(chunk, encoding) {
    if (chunk) {
      resBodyChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding));
    }
    return resEnd.call(this, chunk, encoding);
  };

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    log('info', `← ${res.statusCode} ${req.method} ${req.url} [${reqId}] ${duration}ms`);

    const reqBody = reqBodyChunks.length > 0 ? Buffer.concat(reqBodyChunks) : null;
    const resBody = resBodyChunks.length > 0 ? Buffer.concat(resBodyChunks) : null;

    const targetUrl = TARGET_URL.replace(/\/$/, '') + req.url;
    logRequestResponse(reqId, req, reqBody, res, resBody, duration, targetUrl);
  });

  proxy.web(req, res, (err) => {
    const duration = Date.now() - startTime;
    log('error', `✗ ${req.method} ${req.url} [${reqId}] 错误: ${err.message}`);

    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Bad Gateway',
        message: '无法连接到目标服务器',
        target: TARGET_URL,
        details: err.message
      }));
    }

    const targetUrl = TARGET_URL.replace(/\/$/, '') + req.url;
    logRequestResponse(reqId, req, Buffer.concat(reqBodyChunks), res, null, duration, targetUrl);
  });
});

server.on('upgrade', (req, socket, head) => {
  const reqId = generateRequestId();
  log('info', `⇄ WebSocket 升级 ${req.url} [${reqId}]`);

  const timestamp = getTimestamp();
  const filename = `request-${timestamp}-${reqId}-websocket.log`;
  const filepath = path.join(LOG_DIR, filename);

  const logContent = `=================================
WebSocket 连接日志
时间: ${new Date().toISOString()}
请求ID: ${reqId}

=== 连接信息 ===
URL: ${req.url}
协议: WebSocket

请求头:
${formatHeaders(req.headers)}

=================================
`;

  fs.writeFile(filepath, logContent, (err) => {
    if (err) {
      log('error', `保存 WebSocket 日志失败: ${err.message}`);
    } else {
      log('debug', `已保存 WebSocket 日志: ${filename}`);
      cleanupOldLogs();
    }
  });

  proxy.ws(req, socket, head, (err) => {
    log('error', `✗ WebSocket 连接失败 [${reqId}]: ${err.message}`);
    socket.destroy();
  });
});

proxy.on('error', (err, req, res) => {
  log('error', `代理错误: ${err.message}`);
});

proxy.on('proxyReq', (proxyReq, req, res) => {
  log('debug', `代理请求: ${req.method} ${req.url}`);
});

proxy.on('proxyRes', (proxyRes, req, res) => {
  log('debug', `代理响应: ${proxyRes.statusCode} ${req.url}`);
});

server.listen(PORT, () => {
  log('info', '=================================');
  log('info', '代理服务器已启动');
  log('info', `监听端口: ${PORT}`);
  log('info', `目标地址: ${TARGET_URL}`);
  log('info', `日志目录: ${LOG_DIR}`);
  log('info', `日志级别: ${LOG_LEVEL}`);
  log('info', '=================================');
});

process.on('SIGTERM', () => {
  log('info', '收到 SIGTERM 信号，正在关闭服务器...');
  server.close(() => {
    log('info', '服务器已关闭');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  log('info', '收到 SIGINT 信号，正在关闭服务器...');
  server.close(() => {
    log('info', '服务器已关闭');
    process.exit(0);
  });
});
