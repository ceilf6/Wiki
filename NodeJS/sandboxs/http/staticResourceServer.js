// 静态资源服务器测试

const http = require("http")
const url = require("url")
const path = require("path")
const fs = require("fs")

/**
 * 目标文件信息
 */
function url2path(urlObj) {
    // todo: resolve 可能会导致穿透 public 目录
    const urlPath = path.resolve(
        __dirname,
        "public",
        urlObj.pathname.slice(1,) // 开头 / 去除
    )
    return urlPath
}

async function handler(req, res) {
    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const urlPath = url2path(urlObj)
    try { // 不再推荐 exists API 而是先 读取 再 抓取错误
        const fileStat = await fs.promises.stat(urlPath)
        let finalPath
        if (fileStat.isDirectory()) {
            // 目录文件 // 兜底默认路径
            finalPath = path.resolve(urlPath, './index.html')
            // 找不到文件时会直接 throw 被下面 catch 到
            // const stat2 = await fs.promises.stat(finalPath)
            // if (!stat2) {
            //     res.statusCode = 404
            //     res.write("Resource is not exist");
            //     return
            // }
        } else {
            finalPath = urlPath
        }
        res.statusCode = 200
        // const fileContent = await fs.promises.readFile(finalPath)
        // res.write(fileContent)
        const rs = fs.createReadStream(finalPath)
        rs.pipe(res)
    } catch (e) {
        // 不存在
        res.statusCode = 404;
        res.end("Resource is not exist");
    }
}

const server = http.createServer(handler)
server.on("listening", () => console.log("listening 666"))
server.listen(666)