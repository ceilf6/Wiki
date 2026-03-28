const fs = require('fs')
const path = require('path')

const test = async () => {
    const fileRes = await fs.promises.stat(path.resolve(__dirname, "./fsWriteFile.js"))
    console.log(fileRes)
    /*
        Stats {
        dev: 16777232,
        mode: 33188,
        nlink: 1,
        uid: 502,
        gid: 20,
        rdev: 0,
        blksize: 4096,
        ino: 90845826,
        size: 1289, // 占用字节数
        blocks: 8,
        atimeMs: 1774537866013.4998, // 上一次访问时间
        mtimeMs: 1774537837256.9683, // 上一次修改时间
        ctimeMs: 1774537837256.9683, // 上一次改变文件状态时间，例如访问权限
        birthtimeMs: 1774536741751.1296 // 创建时间
        }
    */

    const dirRes = await fs.promises.stat(__dirname)
    console.log(dirRes)
    /*
        Stats {
        dev: 16777232,
        mode: 16877, // mode为16877时对应的是一个文件目录而不是普通文件
        nlink: 20,
        uid: 502,
        gid: 20,
        rdev: 0,
        blksize: 4096,
        ino: 90721742,
        size: 640, // 目录文件的size是目录文件本身记录其下面所有子文件信息的数据大小
        // 而不是所有子文件大小只和
        blocks: 0,
        atimeMs: 1774671337568.8174,
        mtimeMs: 1774671337228.7004,
        ctimeMs: 1774671337228.7004,
        birthtimeMs: 1774504676110.7285
        }
    */
    console.log(dirRes.isDirectory()) // true
}

test()