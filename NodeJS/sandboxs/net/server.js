const net = require("net")
const path = require("path")
const fs = require("fs")

const server = net.createServer()

server.listen(80) // 监听端口

server.on("listening", () => {
    console.log("日志记录", Date.now())
})

// 每一个客户端连接 服务器都会产生一个socket
server.on("connection", socket => {
    console.log("有客户端连接到服务")

    socket.on("data", async chunk => {
        console.log("服务器接收到", chunk.toString("utf-8"))

        const testFilePath = path.resolve(__dirname, "../testFiles/copyPic.jpg")
        const testFileBuffer = await fs.promises.readFile(testFilePath)

        // 头 Content-type 会影响浏览器的解析
        //         const headBuffer = Buffer.from( // must be an instance of Buffer or Uint8Array
        //             `HTTP/1.1 200 OK
        // Content-Type: image/jpeg

        // `)
        const headBuffer = Buffer.from(
            "HTTP/1.1 200 OK\r\n" +
            "Content-Type: image/jpeg\r\n" +
            `Content-Length: ${testFileBuffer.length}\r\n` +
            "Connection: close\r\n" +
            "\r\n" // 注意每一行结尾都需要 \r\n 否则客户端接受响应时会报错
            // Parse Error: Missing expected CR after response line
        )

        const totalBuffer = Buffer.concat([headBuffer, testFileBuffer]);
        socket.write(totalBuffer);
        socket.end()
    })

    socket.on("end", () => console.log("连接关闭"))
})