const fs = require("fs")
const path = require("path")

const testPath = path.resolve(__dirname, "./testFiles/copyPic.jpg")

// 继承自 Readable
const readStreamObj = fs.createReadStream(testPath, {
    encoding: null, // 编码方式
    highWaterMark: 64 * 1024, // 流每次读取值
    autoClose: true // 文件在读完之后自动关闭
})
console.log(readStreamObj)

// .on(事件名, callback回调函数)
readStreamObj.on("open", () => {
    console.log('文件被打开了')
})

readStreamObj.on("error", () => {
    console.log('出错')
})

readStreamObj.on("close", () => {
    console.log('关闭')
})
// readStreamObj.close() // 手动关闭
readStreamObj.pause() // 暂停读取 => 触发 pause 事件
readStreamObj.resume() // 恢复读取，取消暂停 => 触发 resume 事件

const datas = []

// 每读一块 highWaterMark 大小的文件流后都会触发
// 只有注册了 data 事件时才会读取数据
readStreamObj.on("data", chunk => {
    console.log('当前文件流数据', chunk)
    datas.push(chunk)
})

readStreamObj.on("end", () => {
    console.log('全部数据读取完毕')
    // 还不如直接 readFile
    // 一般流就是处理部分数据处理之后就扔
    console.log(datas)
})