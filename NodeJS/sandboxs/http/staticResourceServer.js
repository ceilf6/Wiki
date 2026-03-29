// 静态资源服务器测试

const http = require("http")
// const url = require("url")
const path = require("path")
const fs = require("fs")

const publicRoot = path.resolve(__dirname, "public")

const mimeTypes = {
    ".css": "text/css; charset=utf-8",
    ".gif": "image/gif",
    ".html": "text/html; charset=utf-8",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml; charset=utf-8",
    ".txt": "text/plain; charset=utf-8",
}

function getMimeType(filePath) {
    return mimeTypes[path.extname(filePath).toLowerCase()] ?? "application/octet-stream"
}

/**
 * 目标文件信息
 */
function req2path(req) {
    // 无脑 resolve 可能会导致穿透 public 目录
    const urlObj = new URL(req.url, `http://${req.headers.host ?? "localhost"}`)
    const pathname = decodeURIComponent(urlObj.pathname)
    const safePath = path.resolve(publicRoot, `.${pathname}`)

    // 做一层 startsWith 校验防止穿透
    if (safePath !== publicRoot && !safePath.startsWith(`${publicRoot}${path.sep}`)) {
        const err = new Error("Forbidden path")
        err.statusCode = 403 // 403无权限
        throw err
    }

    return safePath
}

async function handler(req, res) {
    try { // 不再推荐 exists API 而是先 读取 再 抓取错误
        const urlPath = req2path(req) // 路径穿透 throw 会被抓住
        const fileStat = await fs.promises.stat(urlPath)
        let finalPath
        if (fileStat.isDirectory()) {
            // 目录文件 // 兜底默认路径
            finalPath = path.resolve(urlPath, 'index.html')
        } else {
            finalPath = urlPath
        }

        // 先尝试 stat 读取
        // 这样如果文件不存在也不会被下面 rs onError 误处理为 500
        // 而是被 catch 正确处理为 404 
        await fs.promises.stat(finalPath)

        res.statusCode = 200
        // 设置 MIME 类型 规范浏览器正确处理响应
        res.setHeader("Content-Type", getMimeType(finalPath))

        const rs = fs.createReadStream(finalPath)
        rs.on("error", () => {
            if (!res.headersSent) {
                res.statusCode = 500
            }
            res.end("Internal Server Error")
        })
        rs.pipe(res)
    } catch (e) {
        // 不存在
        res.statusCode = e.statusCode ?? 404
        res.end(e.statusCode === 403 ? "Forbidden" : "Resource is not exist")
    }
}

const server = http.createServer(handler)
server.on("listening", () => console.log("listening 666"))
server.listen(666)
