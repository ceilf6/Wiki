const net = require("net")

// 网路接口对象（双工流：服务器 <=> 客户端，写入内容发送、监听内容接收
const socket = net.createConnection({
    host: "localhost", // 要连接到的主机
    port: 80
}, () => {
    // 连接的回调函数
    console.log("连接成功")
})

// socket.write(`GET /path HTTP/1.1
// 请求头
// Host: localhost
// Connection: keep-alive

// `)
socket.write(
    "GET /path HTTP/1.1\r\n" +
    "Host: localhost\r\n" +
    "Connection: close\r\n" +
    "\r\n"
)
// 必须要有两个换行，防止服务器认为你还没有传完
// GET 无请求体

function parseRes(res) {
    const idx = res.indexOf("\r\n\r\n")
    const head = res.slice(0, idx)
    const headArr = head.split('\r\n')
    const headers = headArr.map(str => str.split(":").map(it => it.trim()))
        .reduce((s, it) => {
            if (it.length === 2) // 排除请求行
                s[it[0]] = it[1]
            return s
        }, {})

    const body = res.slice(idx + 4,).trimStart()
    return { headers, body }
}

let maxSize
let curSize = 0
let headers = null
let body = ""
socket.on("data", chunk => {
    const res = chunk.toString("utf-8")
    if (!headers) {
        // 如果不是声明新变量，而是给外部变量赋值，必须加括号
        ({ headers, body } = parseRes(res))
        // todo: 不一定在一次传输中就传完响应头
        maxSize = +headers["Content-Length"]
        curSize += Buffer.from(body, "utf-8").byteLength
    } else
        curSize += Buffer.from(res, "utf-8").byteLength

    console.log("来自服务器的消息", res)
    if (curSize >= maxSize)
        socket.end() // 客户端主动挂断
})

socket.on("close", () => {
    console.log("连接结束")
})