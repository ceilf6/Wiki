/*
现在，小淘、小天和阿牛位于不同的点上，图中还有一个点放置了一些宝藏。假设他们三个人都会选择最优的路线前往宝藏所在的地点（走最近的那条路线），他们想知道，距离宝藏最近和最远的那个人分别需要走几条边才能到达宝藏所在点
*/

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    const [n, m] = (await readline()).split(' ').map(it => Number(it))
    const [M, W, J, X] = (await readline()).split(' ').map(it => Number(it))
    // const nexts = new Array(n+1).fill([]) // 注意共用引用地址了
    const nexts = Array.from({ length: n + 1 }, () => [])
    for (let i = 0; i < m; i++) {
        const [a, b] = (await readline()).split(' ').map(it => Number(it))
        nexts[a].push(b)
        nexts[b].push(a)
    }
    // console.log(nexts)
    let dMax = -Infinity
    let dMin = Infinity
    const target = [M, W, J]
    const queue = [[X, 0]]
    const vis = new Array(n + 1).fill(0)
    vis[X] = 1
    let head = 0
    while (head < queue.length) {
        const [cur, curD] = queue[head]
        head++
        for (const next of nexts[cur]) {
            if (!vis[next]) {
                // if(next in target){ // 注意 JS in 是判断下标
                if (target.includes(next)) { // 注意得是第一次遇到
                    dMax = Math.max(dMax, curD + 1)
                    dMin = Math.min(dMin, curD + 1)
                }
                queue.push([next, curD + 1])
                vis[next] = 1
            }
        }
    }
    console.log(dMin, dMax)
}()