async function m() {
    const n = await 1;
    console.log('=== n', n);
    return n
}

const mReturn = m()

console.log('=== mReturn', mReturn);

setTimeout(() => {
    console.log('=== mReturn', mReturn); // async 返回的一定是一个 Promise
}, 0)
