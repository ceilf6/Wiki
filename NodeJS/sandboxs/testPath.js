// https://nodejs.org/docs/latest/api/path.html

const path = require('path')

console.log(path.basename("a1/a2/a3/ceilf6.xxxxx", ".xxxxx")) // ceilf6

console.log(path.sep) // /
// separator 分割符，mac是 / window是 \

console.log(path.delimiter) // :
// 不同内容的分割符
console.log(process.env.PATH.split(path.delimiter))

console.log(path.dirname("a1/a2/a3/ceilf6.xxxxx")) // a1/a2/a3
// 当前文件的前缀目录

console.log(path.extname("a1/a2/a3/ceilf6.xxxxx")) // .xxxxx
// 拓展名

const basePath = "a1/a2"
const fullPath = path.join(basePath, "../", "ceilf6.xxxxx")
console.log(fullPath)

console.log(path.normalize("a1/a2/../ceilf6.xxxxx"))
// 规范化，处理 ../ 等等

const path1 = "a1/a2"
const path2 = "a1/a3"
console.log(path.relative(path1, path2))
// 从 path1 => path2

console.log(path.resolve("./index.js")) // 执行命令的位置即 process.cwd() /Users/a86198/Desktop/Wiki
// 绝对路径
console.log(path.resolve(__dirname, "./index.js")) // 通过 __dirname 校准
