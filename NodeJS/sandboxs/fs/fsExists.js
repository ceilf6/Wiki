const fs = require('fs')
const path = require('path')

const test = async () => {
    const paths = {
        path1: path.resolve(__dirname, "./testFiles/1/index.txt"),
        path3: path.resolve(__dirname, "./testFiles/3/index.txt")
    }

    for (const i of [1, 3]) {
        // fs 不推荐先检查是否存在再进行操作
        if (!fs.existsSync(paths[`path${i}`])) {
            console.log(`path${i}不存在`)
        } else {
            console.log(`path${i}存在`)
        }
    }

    for (const i of [1, 3]) {
        // 推荐用 stat 等API先操作再检查抓取错误
        try {
            const fileStat = await fs.promises.stat(paths[`path${i}`])
            console.log(fileStat)
        } catch (e) {
            // catch 之后通过对 错误对象的code属性 进行判断后分流处理
            if (e.code === 'ENOENT') {
                console.log(`path${i}文件不存在`);
            } else {
                throw e;
            }
        }
    }
}

test()