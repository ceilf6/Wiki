const promise = new Promise((resolve, reject) => {
    console.log(1)
    resolve(2)
    console.log(3)
    reject(4)
    console.log(5)
})

promise.then(() => {
    console.log(6)
}, () => {
    console.log(7)
})

console.log(8)