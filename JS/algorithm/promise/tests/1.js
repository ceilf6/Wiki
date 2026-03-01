const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve(); // 即使 Promise 状态改变了，但是不影响同步代码的执行
    console.log(2);
})

promise.then(() => {
    console.log(3);
})

console.log(4);
