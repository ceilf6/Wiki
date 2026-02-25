// 进入 { } 块级作用域时，只创建新的词法环境LexicalEnvironment 、不创建变量环境，所以 var 就能提升
/*
JS/engine-source/src/common/globals.h 中
VariableMode 标记实现: 进入块级作用域时压入新 Context（仅含 kLet/kConst 变量），kVar 变量在编译期就被提升到函数级 Context slot，运行时根本不需要第二条链
*/

if (true) {
    var name = 'ceilf6'; // 写入函数级 VariableEnvironment
    let age = 20; // 写入块级 LexicalEnvironment
}
console.log(name); // logs 'ceilf6'
console.log(age); // let 无法穿透