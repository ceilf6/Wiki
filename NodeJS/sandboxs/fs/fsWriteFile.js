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
    await fs.promises.writeFile(path.resolve(absPath, "../3.txt"), bufferIns)
    // 文件不存在会新建，但是目录不存在就报错了、因为毕竟只是writeFile

    const from = path.resolve(__dirname, "./testFiles/from.txt")
    const to = (i) => path.resolve(__dirname, `./testFiles/to${i}.txt`)
    // 实现复制
    // 1. copyFile
    console.time("1. copyFile")
    await fs.promises.copyFile(from, to(1))
    console.timeEnd("1. copyFile")

    // 2. 先 read 再 write(二进制)
    console.time("2. 先 read 再 write")
    const fileContent = fs.readFileSync(from)
    await fs.promises.writeFile(to(2), fileContent)
    console.timeEnd("2. 先 read 再 write")

    // 3. 文件流
    console.time("3. 文件流")
    const rs = fs.createReadStream(from)
    const ws = fs.createWriteStream(to(3))
    rs.on("data", chunk => {
        // 读到一部分数据
        const flag = ws.write(chunk)
        if (!flag) {
            // 下一次写入会有背压
            rs.pause() // 先暂停读取，等待写
        }
    })
    ws.on("drain", () => {
        rs.resume() // 干涸了，可以继续读
    })
    rs.on("end", () => {
        console.timeEnd("3. 文件流")
    })

    // 4. 文件流pipe() 内部自动处理了背压
    const ws4 = fs.createWriteStream(to(4))
    console.time("4. 文件流pipe")
    rs.pipe(ws4)
    rs.on("end", () => {
        console.timeEnd("4. 文件流pipe")
    })
    /*
        1. copyFile: 0.862ms
        2. 先 read 再 write: 0.719ms
        3. 文件流: 2.555ms
        4. 文件流pipe: 2.302ms
    */

    for (let i = 1; i < 5; i++)
        await fs.promises.unlink(to(i)) // 删除文件
})()