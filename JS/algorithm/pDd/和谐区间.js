// 多多路上从左到右有N棵树（编号1～N），其中第i个颗树有和谐值Ai。
// 多多鸡认为，如果一段连续的树，它们的和谐值之和可以被M整除，那么这个区间整体看起来就是和谐的。
// 现在多多鸡想请你帮忙计算一下，满足和谐条件的区间的数量。

// 首先注意 要求取整，那么能进行 %取余 的地方就要取余，防止精度丢失
// 例如在 readline 拿到数组之后就 map 进行 % : const nums = (await readline()).split(' ').map(item => { return item % M })

// 想要取整，本质就是区间%0，那么就是两头的前缀和在%M后相等 => 相减后为0
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    const [n, M] = (await readline()).split(' ')
    const nums = (await readline()).split(' ').map(item => { return item % M })

    let cur = 0
    // const pres = [0]
    const pres = new Map()
    pres.set(0, 1) // 空前缀
    let ans = 0
    if (!nums.length) {
        console.log(0)
        return
    }
    for (const num of nums) {
        cur = (cur + num) % M
        const pre = pres.get(cur) || 0
        ans += pre
        pres.set(cur, pre + 1)
    }
    console.log(ans)
}()


// 6/10 在遍历过程中进行统计
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    const [n, M] = (await readline()).split(' ')
    const nums = (await readline()).split(' ').map(item => { return item % M })
    // .map取余

    let cur = 0
    const pres = [0]
    let ans = 0
    if (!nums.length) {
        console.log(0)
        return
    }
    for (const num of nums) {
        cur = (cur + num) % M
        for (const pre of pres) {
            if ((cur - pre) % M == 0)
                ans += 1
        }
        pres.push(cur)
    }
    console.log(ans)
}()


// 1/10 没有在遍历过程中就进行统计
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    const [n, M] = (await readline()).split(' ')
    const nums = (await readline()).split(' ').map(item => { return item % M })
    // console.log(nums)
    if (!nums.length) {
        console.log(0)
        return
    }
    const pre = [0]
    for (let i = 0; i < n; i++) {
        pre.push((pre[pre.length - 1] + nums[i]) % M)
        // 要求整除，那么处理的时候就可以取余
    }
    let ans = 0
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n + 1; j++) {
            if ((pre[j] - pre[i]) % M == 0)
                ans += 1
        }
    }
    console.log(ans)
}()
