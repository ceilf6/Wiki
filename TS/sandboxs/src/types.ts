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

// === 1. 字面量类型
let type2: "ceilf6"

type2 = "ceilf6"
// type2 = "ceilf7" // 不能将类型“"ceilf7"”分配给类型“"ceilf6"”。


// === 2. 联合类型
let type3: string | number | false

// type3 = true // 不能将类型“true”分配给类型“string | number | false”。
// 1 // "1"
let sex: "male" | "female"
// sex = "人妖" // 不能将类型“"人妖"”分配给类型“"male" | "female"”。


// === 3. 数组类型
let arrType: number[]
let arrType2: Array<number>

arrType = [1]
arrType = [2]
const arr: Array<number> | string[] = ["1", "2"] // ,3]


// === 4. 元组
let pos: [number, string]

pos = [1, "2"] // ["1",2]

let emptyArr: [] // 空元组类型
// emptyArr = [1] // 不能将类型“[number]”分配给类型“[]”。
//   源具有 1 个元素，但目标仅允许 0 个。
let emptyArr2 = []
emptyArr2 = [1]
emptyArr2.push(1)


// === 5. 函数
function sum(a: number, b: number, c: string, ...args: number[]): string {
    return String(a + b + Number(c) + args.reduce((s, it) => {
        s += it
        return s
    }, 0))
}
console.log(sum(1, 2, "3", 4, 5)) // 类型“number”的参数不能赋给类型“string”的参数。

const sum2 = (a: number, args: number[]) => {
    console.log(a + args.reduce((s, it) => { s += it; return s }, 0))
}
sum2(1, [2, 3, 4, 5])


// === 6. 范型
const fanXing = <T>(arg: T): T => {
    return arg
}
interface fanXing2<T> {
    att: T
}

console.log(fanXing<string>("hello"))
let ins = fanXing("ceilf6") // 对象字面量 const fanXing: <"ceilf6">(arg: "ceilf6") => "ceilf6"
const obj: fanXing2<number> = {
    att: 10
}
const obj2: fanXing2<string> = {
    att: "hello"
}

// 配合类型映射进行约束
type Transform<T> =
    T extends number ? string :
    T extends string ? number :
    never
function transform<T extends number | string>(arg: T): Transform<T> {
    if (typeof arg === "number") {
        // return arg as Transform<T> // 类型 "T & number" 到类型 "Transform<T>" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"。
        return String(arg) as Transform<T>
    }
    if (typeof arg === "string")
        return Number(arg) as Transform<T>
    throw new Error("unexcepted type")
}
console.log(transform("1") + 2)
// 上面的用 函数重载 实现
function transform2(arg: number): string
function transform2(arg: string): number
function transform2(arg: number | string): number | string {
    if (typeof arg === "number") {
        return String(arg)
    }
    if (typeof arg === "string")
        return Number(arg)
    throw new Error("unexcepted type")
}
console.log(transform("3") + 4)

function tuple<T1, T2>(a: T1, b: T2): [T1, T2] {
    return [a, b]
}
console.log(tuple(1, "2"))

function filterNumCallback<T1, callbackT extends T1>(args: T1[], callback: (item: callbackT) => void,
    guard: (item: T1) => item is callbackT
): number[] {
    const filter: number[] = []
    for (const item of args) {
        if (guard(item)) {
            callback(item)
        }

        if (typeof item === 'number') {
            filter.push(item)
        }
    }
    return filter
}
filterNumCallback([1, 2, "3", 4, 5], (item) => console.log(item),
    (item): item is number => typeof item === "number"
)


// === 7. 对象字面量类型
let Obj: {
    id: number,
    name: string,
    sex?: 'male' | 'female'
}
Obj = {
    id: 1,
    name: 'ceilf6'
}
Obj.sex = 'male'

const Objs: { id: number, name: string }[] = [{ id: 2, name: 'ceilf7' }]


// === 8. 自定义类型
// a. 类型别名：任何有效的类型
type pos = {
    x: number,
    y: number
} | undefined

const posIns: pos = {
    x: 1,
    y: 2
}

// b. 接口：面向对象的概念，一般用于定义对象类型
interface pos2 {
    x: number,
    y: number,
    callback(str: string): void,
    callback2?: (num: number) => void
}

const pos2Ins: pos2 = {
    x: 1,
    y: 2,
    callback(str) {
        console.log(str + this.x + this.y)
    }
}
function clg(pos: pos2) {
    console.log(pos.x)
}
pos2Ins.callback('ceilf6')


// === 9. 交叉类型
type a1 = {
    id: number,
    name: string
}
type a2 = {
    id: number,
    age: number
}
type a = a1 & a2

const aIns: a = {
    id: 1,
    name: 'ceilf6',
    age: 20
}
type aCom = a1 | a2
const aComIns: aCom = {
    id: 1,
    name: 'ceilf6',
    age: 20
}

type t = number & string // type t = never


// === 10. 类型断言
function split(val: any) {
    console.log((val as string).split(' '))
}
// 非空断言
let maybeVal: string | undefined = undefined
maybeVal = '1 2'
console.log(maybeVal!.split(' '))

// const inputDOM = document.querySelector('input') // HTMLInputElement | null
// “inputDOM”可能为 “null”。
// inputDOM!.addEventListener('click', e => { console.log((e.target as HTMLInputElement).value) })


// === 11. 可选链
const objIns: {
    id?: number
} = {
}
console.log(objIns.id?.toFixed(2)) // undefined