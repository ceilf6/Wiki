const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve() // 即 resolve(undefined)
    }, 1000)
})
const promise2 = promise1.catch(() => { // 不是 resolve 的后续处理，Promise2 追随 Promise1
    return 2;
})

console.log('promise1', promise1)
console.log('promise2', promise2)

setTimeout(() => {
    console.log('promise1', promise1)
    console.log('promise2', promise2)
}, 2000)
