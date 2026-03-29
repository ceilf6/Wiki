let cycleCnt = 0

// poll
const http = require("http")
const server = http.createServer(() => console.log("cycleCnt", cycleCnt))
server.listen(6666)

// timer
setTimeout(function timer1() {
    console.log('timer1')
    cycleCnt++
    const requestObj = http.request("http://127.0.0.1:6666")
    requestObj.end()
}, 1000)

setTimeout(function timer2() {
    console.log('timer2')
    cycleCnt++
    const requestObj = http.request("http://127.0.0.1:6666")
    requestObj.end()
}, 2000)

const fs = require("fs")
fs.readFile("NodeJS/sandboxs/testFiles/1.txt", () => {
    console.log("after readFile cycleCnt", cycleCnt)
})

// check
// 在该轮事件循环后段执行
setImmediate(() => console.log("Immediate cycleCnt", cycleCnt))

/*
timer => poll => check

Immediate cycleCnt 0
after readFile cycleCnt 0
timer1
cycleCnt 1
timer2
cycleCnt 2
*/