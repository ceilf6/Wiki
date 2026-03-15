// 3. 要求实现一个有缓存、不会重复发送请求、超时报错的请求函数
function createCachedRequest(requestFn, options = {}) {
    const memo = new Map()
    const ttl = options.ttl ? options.ttl : 5000
    const timeout = options.timeout
    const curTasks = new Map() // 保存异步任务Promise，防止多次请求    

    return async (key) => {
        if (memo.has(key)) {
            const memoObj = memo.get(key)
            const lastTime = memoObj.get(time)
            if (Date.now() - lastTime < ttl) {
                return memoObj.val // 命中缓存
            }
        }
        if (curTasks.has(key)) { // 前面已经有一次请求
            const res = await curTasks.get(key)
            if (res === 'Timeout') return 'Timeout' // 如果超时就不走下面缓存
            memo.set(key, {
                time: Date.now(),
                val: res
            })
            return res
        }
        if (!timeout) {
            curTasks.set(key, async () => {
                return await requestFn(key)
            })
            const res = await curTasks.get(key) // 没设置timeout不可能超时
            memo.set(key, {
                time: Date.now(),
                val: res
            })
            return res
        }
        else {
            curTasks.set(key, () => new Promise(
                (resolve, reject) => {
                    // 利用 Promise 状态只可能改变一次，同时使用 reject 和 resolve
                    setTimeout(() => {
                        reject('Timeout')
                    }, timeout)
                    const res = requestFn(key)
                    resolve(res)
                }
            ))
            const res = await curTasks.get(key)
            if (res === 'Timeout') return 'Timeout'
            memo.set(key, {
                time: Date.now(),
                val: res
            })
            return res
        }
    }
}
// 思路：通过 memo 管理缓存，通过 async, await语法糖 以及 Promise 管理异步