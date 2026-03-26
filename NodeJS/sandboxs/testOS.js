const os = require('os')

console.log('ceil6', os.EOL, 'hello')

console.log(os.arch()) // 架构名

console.log(os.cpus()) // CPU核信息数组

console.log(os.freemem()) // 剩余可用内存 单位字节(8bit)

console.log(os.homedir()) // 用户目录 /Users/a86198

console.log(os.hostname()) // 主机名 ...deMacBook-Pro.local

console.log(os.tmpdir()) // 临时目录 /var/folders/qv/rs4njq4d617fhy2_chxd682w0000gp/T