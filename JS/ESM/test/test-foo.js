import foo from "./foo.js"; // 并不是赋值一份，而是同一份

const fooIns = new foo()
console.log(fooIns.name)