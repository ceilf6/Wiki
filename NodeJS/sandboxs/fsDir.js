const fs = require('fs')
const path = require('path')

const test = async () => {
  const res = await fs.promises.readdir(__dirname)
  console.log(res)
  /* 读取目录
    [
      'GlobalObject.js',   'fsReadFile.js',
      'fsReaddir.js',      'fsStat.js',
      'fsWriteFile.js',    'index.js',
      'mainDec.js',        'node_modules',
      'package-lock.json', 'package.json',
      'testCMJ.cjs',       'testESMinCMJ.mjs',
      'testFiles', // 可以读到目录文件，但是无法递归读取深度文件
      'testImportCMJ.js',
      'testJSON.json',     'testOS.js',
      'testPath.js',       'testURL.js',
      'testUtil.js'
    ]
  */
  // const fileRes = await fs.promises.readdir(path.resolve(__dirname, './index.js'))
  // console.log(fileRes) // ENOTDIR: not a directory readdir读取文件会报错

  for (let i = 3; i <= 6; i++) {
    // await 就阻塞了，不是并行了
    const dir = path.resolve(__dirname, `./testFiles/${i}`)
    const file = path.resolve(dir, 'index.txt')
    fs.promises.mkdir(dir, { recursive: true }) // 参数对象：如果父目录不存在那就连同父目录一同创建
      .then(() => fs.promises.writeFile(file, `ceilf${i}`))
    // then 中传入的是后续的异步处理函数
  }
}

test()