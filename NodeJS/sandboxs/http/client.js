const http = require("http")

// 比 AJAX 更加底层
const requestObj = http.request(
    "http://127.0.0.1:80",
    {
        // method: "GET",
        method: "POST"
    },
    res => {
        // http.IncomingMessage 对象
        // https://nodejs.org/docs/latest/api/http.html#class-httpincomingmessage
        // console.log(res)
        console.log(res.statusCode) // 响应行状态码
        console.log(res.headers) // ['Content-Type']) // 响应头
        // 不是 res.body 因为响应体可大可小，要是太大了还放到属性里面，内存会爆
        // 所以用 流 的方式读取
        res.on("data", chunk => {
            console.log(chunk)
        })
        res.on("end", chunk => {
            console.log(chunk)
            console.log("响应体读取结束")
        })
    }
)

requestObj.write("ceilf6=so-handsome") // 请求体

requestObj.end() // 发送请求体（不然没有两个换行服务器不会响应）

// 错误监听，不然解析失败时进程会直接崩
requestObj.on("error", err => {
    console.error(err)
})
