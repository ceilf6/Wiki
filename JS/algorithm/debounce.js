function debounce(fn, wait) {
    let timer = null
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args) // 注意 this 和 args参数 的丢失问题
        }, wait)
    }
}