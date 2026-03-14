const obj = {
    a1: () => {
        console.log()
    },
    sunObj: {
        a2: 2
    },
    a3: new Map()
}

export function deepCopy2(from) {
    return JSON.parse(JSON.stringify(from))
}
console.log(deepCopy2(obj))
console.log(deepCopy(obj))

// 用记忆化解决循环引用问题：如果某个对象已经拷贝过了，就直接返回之前的拷贝
// 映射: 原对象 -> 拷贝对象
function deepCopy(from, memo = new WeakMap()) {
    if (typeof from !== 'object' || from === null) {
        return from
    }

    if (memo.has(from)) {
        return memo.get(from)
    }

    let to

    if (from instanceof Date) {
        to = new Date(from)
    }
    else if (from instanceof RegExp) {
        to = new RegExp(from)
    }
    else if (from instanceof Map) {
        to = new Map()
        memo.set(from, to)
        from.forEach((v, k) => {
            to.set(deepCopy(k, memo), deepCopy(v, memo))
        })
        return to
    }
    else if (from instanceof Set) {
        to = new Set()
        memo.set(from, to)
        from.forEach(v => {
            to.add(deepCopy(v, memo))
        })
        return to
    }
    else {
        to = Array.isArray(from) ? [] : {}
    }

    memo.set(from, to)

    for (const key in from) {
        if (from.hasOwnProperty(key)) {
            to[key] = deepCopy(from[key], memo) // 注意得用属性计算符 [] 而不是 .
        }
    }

    return to
}