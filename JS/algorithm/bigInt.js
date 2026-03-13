/**
 * 
 * @param {string} a 
 * @param {string} b 
 * @returns 
 */
function addBigNumber(a, b) {
    let i = a.length - 1;
    let j = b.length - 1;
    let carry = 0; // 进位信息
    // 如果用数组进行管理还复杂化了，不如直接设一个变量存储进位信息
    let res = "";

    while (i >= 0 || j >= 0 || carry > 0) {
        const x = i >= 0 ? a[i] - '0' : 0; // >=0 实现越界处理
        const y = j >= 0 ? b[j] - '0' : 0;

        const sum = x + y + carry;
        res = (sum % 10) + res;
        carry = Math.floor(sum / 10);

        i--;
        j--;
    }

    return res;
}
console.log(addBigNumber('1111111111111111', '22222222222222222222'))

function multiplyBigNumber(num1, num2) {
    if (num1 === "0" || num2 === "0") return "0";

    const m = num1.length;
    const n = num2.length;
    const res = new Array(m + n).fill(0);
    // num1[i] * num2[j] 的结果会落在结果数组的 i + j 和 i + j + 1 位置

    // O(m*n)
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const x = num1.charCodeAt(i) - 48; // num1[i] - 48
            const y = num2.charCodeAt(j) - 48;

            const mul = x * y;
            const p1 = i + j;
            const p2 = i + j + 1;

            const sum = mul + res[p2];
            res[p2] = sum % 10;
            res[p1] += Math.floor(sum / 10);
        }
    }

    let start = 0;
    while (start < res.length && res[start] === 0) {
        start++;
    }

    return res.slice(start).join("");
}