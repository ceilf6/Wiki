// https://nodejs.org/docs/latest/api/fs.html

const fs = require("fs")

const path = require("path")
const absPath = path.resolve(__dirname, "./testFiles/1.txt")
console.log('1. ', fs.readFileSync(absPath, "utf-8")); // 注意分号，和IIFE区分

(async () => {
    // fs.writeFile(absPath,
    //     "so handsome",
    //     {
    //         encoding: "utf-8",
    //         flag: "a" // append 追加内容而不是覆盖
    //     },
    //     (err, res) => {
    //         console.log("写入成功")
    //     }
    // )
    // console.log('2. ', fs.readFileSync(absPath, "utf-8"))

    await fs.promises.writeFile(absPath, "ceilf6 so handsome")
    // fs.promises 返回 Promise (fs.readFile由于历史原因所以没删)
    console.log('3. ', fs.readFileSync(absPath, "utf-8"))

    const bufferIns = Buffer.from("ceilf7", "utf-8")
    await fs.promises.writeFile(path.resolve(absPath, "../2.txt"), bufferIns)
    // 文件不存在会新建，但是目录不存在就报错了、因为毕竟只是writeFile

    // 实现复制
    // 1. copyFile
    // 2. 先 read 再 write(二进制)
    const fileContent = fs.readFileSync("/Users/a86198/Desktop/Lab/assetsForTest/cat.jpg")
    await fs.promises.writeFile(path.resolve(absPath, "../copyPic.jpg"), fileContent)
})()