const http = require("http")
const url = require("url") // 分析请求地址

function handleReq(req) {
    console.log("监听到请求")
    console.log("请求地址", req.url)
    // const urlObj = url.parse(req.url) // `url.parse()` behavior is not standardized
    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    console.log("请求地址对应URL对象信息", urlObj)
    console.log("请求头", req.headers)

    // 请求体同理也在流中处理，防止文件过大
    req.on("data", chunk => {
        console.log("当前请求体文件块", chunk.toString("utf-8"))
    })
    req.on("end", () => console.log("请求结束"))
}

// 返回一个 server 对象，类似于 socket
// https://nodejs.org/docs/latest/api/http.html#class-httpserver
const server = http.createServer(
    (req, res) => {
        // IncomingMessage, ServerResponse
        // https://nodejs.org/docs/latest/api/http.html#class-httpincomingmessage
        // https://nodejs.org/docs/latest/api/http.html#class-httpserverresponse

        handleReq(req)

        res.statusCode = 200
        res.setHeader("from", "ceilf6")
        // 响应体的设置也是流的方式
        res.write("hello")
        res.end()
    }
)

server.listen(80)

server.on("listening", () => {
    console.log("日志记录", Date.now())
})