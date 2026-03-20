const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    const T = Number(await readline());
    for (let i = 0; i < T; i++) {
        let [n, m] = (await readline()).split(" ").map((it) => Number(it));
        let a;
        let b;
        if (n > m) {
            // 确保 a 比 b 长, n > m
            // [a,b] = (await readline()).split(' ')
            a = await readline();
            b = await readline();
        } else {
            [n, m] = [m, n];
            // [b,a] = (await readline()).split(' ')
            b = await readline();
            a = await readline();
        }
        const ans = new Array(n).fill(1);
        for (let i = 0; i < m; i++) {
            if (a[i + n - m] === b[i]) ans[i + n - m] = 0;
        }
        //         let cur = 1
        //         let ansNum = 0
        const BASE = 998244353n
        // 下面这种做法精度有问题因为 cur << 1 是 32 位
        //         for(let i=0;i<n;++i){
        //             if(ans[n-1-i]){
        //                 cur = (cur+BASE)%BASE
        //                 ansNum = (ansNum+cur+BASE)%BASE
        //             }
        //             cur = cur << 1
        //             // console.log(cur)
        //         }
        //         console.log(ansNum)

        // 转成 BigInt
        const binStr = ans.join("");
        const result = BigInt("0b" + binStr) % BASE;

        console.log(result.toString());
    }
})();
