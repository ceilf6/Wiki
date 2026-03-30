let i = 0
console.time("setTimeout")
function testTimeout() {
    i++
    if (i < 1000) {
        setTimeout(testTimeout, 0)
    } else {
        console.timeEnd("setTimeout")
    }
}
testTimeout()

let i2 = 0
console.time("setImmediate")
function testImmediate() {
    i++
    if (i < 1000) {
        setImmediate(testImmediate)
    } else {
        console.timeEnd("setImmediate")
    }
}
testImmediate()

/*
setImmediate: 14.879ms
setTimeout: 20.22ms
*/