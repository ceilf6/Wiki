const vis = new Set() // 通过将访问过的对象 hash 之后放入到 vis 中实现记忆，防止循环引用
function deepCopy(from) {
    if (Object.prototype.toString.call(from) === '[object Object]') {
        if (vis.has(hash(from)))
            throw new Error('circular reference')
        const to = Object.create(null)
        for (const key of from.keys()) {
            to.key = deepCopy(from[key])
        }
        return to
    }
    else if (Object.prototype.toString.call(from) === '[object Array]') {
        const to = []
        for (const item of from) {
            to.push(deepCopy(item))
        }
        return to
    }
    else {
        return from
    }
}