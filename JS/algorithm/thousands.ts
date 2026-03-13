// toLocaleString 原生API
function localeAPI(num: number): string {
    return num.toLocaleString()
}
console.log(localeAPI(1234567890))


function formatThousands(num) {
    const str = String(num)
    const [intPart, decimalPart] = str.split('.')
    // 小数处理

    let res = ''
    let count = 0

    for (let i = intPart.length - 1; i >= 0; i--) {
        res = intPart[i] + res
        count++

        if (count % 3 === 0 && i !== 0) {
            res = ',' + res
        }
    }

    return decimalPart !== undefined ? res + '.' + decimalPart : res
}

console.log(formatThousands(1234567890)) // 1,234,567,890
console.log(formatThousands(1234567.89)) // 1,234,567.89