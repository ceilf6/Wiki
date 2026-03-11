"use strict";
/*
- number
- string
- boolean
- null
- undefined
- symbol
- bigint
- object
*/
var _a;
// === 1. 字面量类型
let type2;
type2 = "ceilf6";
// type2 = "ceilf7" // 不能将类型“"ceilf7"”分配给类型“"ceilf6"”。
// === 2. 联合类型
let type3;
// type3 = true // 不能将类型“true”分配给类型“string | number | false”。
// 1 // "1"
let sex;
// sex = "人妖" // 不能将类型“"人妖"”分配给类型“"male" | "female"”。
// === 3. 数组类型
let arrType;
let arrType2;
arrType = [1];
arrType = [2];
const arr = ["1", "2"]; // ,3]
// === 4. 元组
let pos;
pos = [1, "2"]; // ["1",2]
let emptyArr; // 空元组类型
// emptyArr = [1] // 不能将类型“[number]”分配给类型“[]”。
//   源具有 1 个元素，但目标仅允许 0 个。
let emptyArr2 = [];
emptyArr2 = [1];
emptyArr2.push(1);
// === 5. 函数
function sum(a, b, c, ...args) {
    return String(a + b + Number(c) + args.reduce((s, it) => {
        s += it;
        return s;
    }, 0));
}
console.log(sum(1, 2, "3", 4, 5)); // 类型“number”的参数不能赋给类型“string”的参数。
const sum2 = (a, args) => {
    console.log(a + args.reduce((s, it) => { s += it; return s; }, 0));
};
sum2(1, [2, 3, 4, 5]);
// === 6. 范型
const fanXing = (arg) => {
    return arg;
};
console.log(fanXing("hello"));
let ins = fanXing("ceilf6"); // 对象字面量 const fanXing: <"ceilf6">(arg: "ceilf6") => "ceilf6"
const obj = {
    att: 10
};
const obj2 = {
    att: "hello"
};
function transform(arg) {
    if (typeof arg === "number") {
        // return arg as Transform<T> // 类型 "T & number" 到类型 "Transform<T>" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"。
        return String(arg);
    }
    if (typeof arg === "string")
        return Number(arg);
    throw new Error("unexcepted type");
}
console.log(transform("1") + 2);
function transform2(arg) {
    if (typeof arg === "number") {
        return String(arg);
    }
    if (typeof arg === "string")
        return Number(arg);
    throw new Error("unexcepted type");
}
console.log(transform("3") + 4);
function tuple(a, b) {
    return [a, b];
}
console.log(tuple(1, "2"));
function filterNumCallback(args, callback, guard) {
    const filter = [];
    for (const item of args) {
        if (guard(item)) {
            callback(item);
        }
        if (typeof item === 'number') {
            filter.push(item);
        }
    }
    return filter;
}
filterNumCallback([1, 2, "3", 4, 5], (item) => console.log(item), (item) => typeof item === "number");
// === 7. 对象字面量类型
let Obj;
Obj = {
    id: 1,
    name: 'ceilf6'
};
Obj.sex = 'male';
const Objs = [{ id: 2, name: 'ceilf7' }];
const posIns = {
    x: 1,
    y: 2
};
const pos2Ins = {
    x: 1,
    y: 2,
    callback(str) {
        console.log(str + this.x + this.y);
    }
};
function clg(pos) {
    console.log(pos.x);
}
pos2Ins.callback('ceilf6');
const aIns = {
    id: 1,
    name: 'ceilf6',
    age: 20
};
const aComIns = {
    id: 1,
    name: 'ceilf6',
    age: 20
};
// === 10. 类型断言
function split(val) {
    console.log(val.split(' '));
}
// 非空断言
let maybeVal = undefined;
maybeVal = '1 2';
console.log(maybeVal.split(' '));
// const inputDOM = document.querySelector('input') // HTMLInputElement | null
// “inputDOM”可能为 “null”。
// inputDOM!.addEventListener('click', e => { console.log((e.target as HTMLInputElement).value) })
// === 11. 可选链
const objIns = {};
console.log((_a = objIns.id) === null || _a === void 0 ? void 0 : _a.toFixed(2)); // undefined
