// https://nodejs.org/docs/latest/api/fs.html

const fs = require("fs")

fs.readFile('./NodeJS/sandboxs/testFiles/1.txt',
    (err, res) => {
        console.log(res)
    }
)
console.log('异步回调')
// 相对路径相对的是命令提示符 // 只有 require 中相对的是当前文件路径
// 借助 path => 绝对路径
const path = require("path")
const absPath = path.resolve(__dirname, "./testFiles/1.txt")
fs.readFile(absPath,
    (err, res) => {
        console.log(res)
        console.log(res.toString("utf-8"))
    }
)
fs.readFile(absPath, "utf-8", (err, res) => console.log(res))

const syncFile = fs.readFileSync(absPath, "utf-8")
console.log('同步读取', syncFile)

const pro1 = fs.promises.readFile(absPath, "utf-8")
// fs.promises 返回 Promise (fs.readFile由于历史原因所以没删)
pro1.then(res => console.log(res))