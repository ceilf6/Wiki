const fs = require("fs")
const path = require("path")

const testPath = path.resolve(__dirname, "./testFiles/from.txt")

// 继承自 Writeable
const writeStreamObj = fs.createWriteStream(testPath, {
    flags: "w", // write 写入并覆盖 
    // "a" - append 追加
    encoding: "utf-8", // 文本； Buffer 用 null
    // start: , // 开始写的字节位置
    highWaterMark: 3, // 16 * 1024, // 一次最多写入字节数
    autoClose: true,
})

console.log(writeStreamObj)

// writeStreamObj.on(事件名，回调函数)

// .write 写入数据
const res = writeStreamObj.write("入") // "\nceilf6")
console.log(res) // false 在utf-8中 中文占三个字节导致通道highWaterMark被填满
// true：写入通道没有被填满，接下来的数据可以直接写入，无须排队
// false：写入通道目前已被填满，接下来的数据将进入写入队列
//  // 要特别注意背压问题，因为写入队列是内存中的数据，是有限的


let cur = 0
const maxSize = 1024 * 1024 // 1M
function tryWrite() {
    let flag = true
    while (cur < maxSize && flag) {
        flag = writeStreamObj.write("a")
        cur++
    }
    if (cur === maxSize) {
        console.log("结束写入")
        console.log("干涸次数", testDrainCnt)
    }
}
let testDrainCnt = 0
// 通过 drain 干涸事件解决背压问题
writeStreamObj.on("drain", () => {
    testDrainCnt++
    tryWrite()
})
console.log("不阻塞同步操作")
/*
不阻塞同步操作
结束写入
干涸次数 342
*/

// writeStreamObj.end("\n最后写入")
// 立刻标记这个流结束，后续不允许再继续 .write()