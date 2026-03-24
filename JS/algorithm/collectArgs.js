function sum(a, b, c) {
    return a + b + c
}

function wrap(fn) {
    // const args = [] // 直接将参数传递，在外面维护会导致参数丢失
    function dfs(...curAllArgs) { // (todos, ...curArgs) {
        if (fn.length - curAllArgs.length <= 0) {
            return fn(...curAllArgs.slice(0, fn.length))
        }

        const res = (...nextArgs) => dfs(...nextArgs, ...curAllArgs)
        return res
    }
    return dfs
}

const test = wrap(sum)
console.log(test(1, 2)(3))
console.log(test(1)(2)(3))