
// n1 + n2 + n3 ... < n 
// 使得 n1 * n2 * n3 ... 最大

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
let idx = 0;

const T = Number(input[idx++]);
const MOD = 1000000007n;

function qpow(a, b) {
    let base = BigInt(a) % MOD;
    let exp = BigInt(b);
    let res = 1n;
    while (exp > 0n) {
        if (exp & 1n) res = res * base % MOD;
        base = base * base % MOD;
        exp >>= 1n;
    }
    return res;
}

let out = [];

for (let t = 0; t < T; t++) {
    const n = Number(input[idx++]);
    let ans;

    if (n === 1) {
        ans = 1n;
    } else if (n % 3 === 0) {
        ans = qpow(3, n / 3);
    } else if (n % 3 === 1) {
        ans = 4n * qpow(3, (n - 4) / 3) % MOD;
    } else {
        ans = 2n * qpow(3, (n - 2) / 3) % MOD;
    }

    out.push(ans.toString());
}

console.log(out.join('\n'));

// m = a1**n1 * a2**n2 ...
// n1 + n2 + ... <= n
// m = (a1*a2...)*k*随意 要让k的数量最多
// 那么就是要让 m/(a1*a2...) 的因数越多
// a1**(n1-1) * a2**(n2-1) ...

// 假设总共有 p 个 a
// ans = A(p,p)
// let ans = 1

// let ans = 0
// console.log(Math.sqrt(36),Math.sqrt(216))
// for(let i=1;i<Math.sqrt(2**6*3**6);i++){
//     if(2**6*3**6%i===0)
//         ans+=2
// }
// console.log(ans)

// if(n>=ansArr.length){
//     let cur = ansArr.length
//     while(cur<n){
//         ansArr.push(ansArr[ansArr.length-1]+Math.floor((cur+1)/2))
//         cur++
//     }
// }

// console.log(ansArr[n-1])
//     }
// }()
