const timerId = setTimeout(() => { }, 1000)
console.log(timerId) // 浏览器计时器ID是数字，Node中是对象

console.log(__dirname) // (webpack)
console.log(globalThis.__dirname)
console.log(__filename)

const bufferArr = Buffer.from("ceilf6", "utf-8")
console.log(bufferArr) // <Buffer 63 65 69 6c 66 36>

console.log(process.cwd())
/*
a86198@wangjinghongdeMacBook-Pro Wiki % node NodeJS/sandboxs/index.js
/Users/a86198/Desktop/Wiki
*/

// for (let i = 0; i < 10; i++) {
//     console.log(i)
//     if (i === 3)
//         process.exit(0) // '提前退出')
// }
// console.log('后面退出')

console.log(process.argv) // 获取命令的所有 args
/*
node "/Users/a86198/Desktop/Wiki/NodeJS/sandboxs/index.js" ceilf6 so handsome
[
  '/opt/homebrew/Cellar/node/24.7.0/bin/node',
  '/Users/a86198/Desktop/Wiki/NodeJS/sandboxs/index.js',
  'ceilf6',
  'so',
  'handsome'
]
*/

console.log(process.platform) // darwin // Apple 开发的一个类 Unix 操作系统

// process.kill(49757)

console.log(process.env) // 环境变量 键值对
