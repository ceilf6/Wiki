/*
入参：
` 
-1
    a
        1
2
        b
    bb
3
`
目标：
[
{value: ' - 1', children: [{value: 'a', children: [{value: 1}]}]},
{value: '2', children: [{value: 'b'}, {value: 'bb'}]},
{value: '3'}
]
*/

function tabParser(str) {
    const ans = []
    const chrs = str.split('\n')
    const preNums = chrs.reduce((s, item) => {
        let cur = 0
        while (item[cur] === ' ')
            cur++
        s.push([cur, item.slice(cur, item.length)])
        return s
    }, [])
    // console.log(preNums) // 缩进数量信息数组：[缩进数，值]

    const preMsg = [] // 单调栈维护之前信息，栈顶到栈尾呈单调递增趋势，方便找到上一个小于当前元素的位置
    // 元素是 [缩进数，引用]
    for (const item of preNums) {
        const ref = { value: item[1], children: [] } // 记录引用，方便插入child // 如果不希望children初始化空数组，那么到时候加入的时候做判断即可
        while (preMsg.length && item[0] <= preMsg[preMsg.length - 1][0]) {
            preMsg.pop()
        }
        if (!preMsg.length) {
            ans.push(ref)
        } else {
            preMsg[preMsg.length - 1][1].children.push(ref)
        }
        preMsg.push([item[0], ref])
    }

    return ans
}

const targetStr = `-1
    a
        1
2
        b
    bb
3`
console.log(tabParser(targetStr))