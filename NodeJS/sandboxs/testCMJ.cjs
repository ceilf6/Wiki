const jsonObj = require("./testJSON")
console.log(jsonObj)

require("./mainDec")

console.log(module)
/**
 * id
 * path
 * exports 对象
 * loaded
 * children
 * Symbol
 */

console.log(require)
console.log(require.resolve('./'))
// package main声明的 /Users/a86198/Desktop/Wiki/NodeJS/sandboxs/mainDec.js

// this === exports === module.exports
console.log('this === exports', this === exports)
console.log('this === module.exports', this === module.exports)

exports.test = 'ceilf6'
console.log(this) // { test: 'ceilf6' }
module.exports = {
    test2: 'ceilf7'
}
// 最后导出的是 { test2: 'ceilf7' }

// import ESMObj from './testESMinCMJ.mjs' // SyntaxError: Cannot use import statement outside a module
import('./testESMinCMJ.mjs').then(res => console.log(res))
// [Module: null prototype] { default: { test: 'ceilf6' } }

console.log(require('./testESMinCMJ.mjs'))
/*
[Module: null prototype] {
  __esModule: true,
  default: { test: 'ceilf6' }
}
 */
