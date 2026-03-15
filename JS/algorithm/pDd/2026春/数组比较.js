// 2. 新旧数组比较
function diffList(oldList, newList, key) {
    const ans = {
        added: [],
        removed: [],
        changed: []
    }

    const LO = oldList.length
    const LN = newList.length
    // sort 会影响原先数组,最好先拷一份再在新的上面处理
    const oldArr = oldList.sort((a, b) => {
        if (a[key] === b[key]) return 0
        return a[key] > b[key] ? 1 : -1 // 兼顾字符串的情况
    })
    const newArr = newList.sort((a, b) => {
        if (a[key] === b[key]) return 0
        return a[key] > b[key] ? 1 : -1
    })
    let oldPtr = 0
    let newPtr = 0
    while (oldPtr < LO && newPtr < LN) {
        const oldItem = oldArr[oldPtr]
        const newItem = newArr[newPtr]
        if (oldItem.id === newItem.id) {
            const fields = []
            // 因为我看题目没有说新增字段，所以就直接取旧对象的属性进行比较
            // const keys = Object.keys(oldItem)
            const keys = [...new Set([...Object.keys(oldItem), ...Object.keys(newItem)])]
            // 如果需要的话可以通过 ...new Set 取并集
            for (const key of keys) {
                if (oldItem[key] !== newItem[key]) {
                    fields.push({
                        field: key,
                        oldVal: oldItem[key],
                        newVal: newItem[key]
                    })
                }
            }
            if (fields.length) { // 注意防空处理
                ans.changed.push({
                    id: oldItem.id,
                    fields: fields
                })
            }
            oldPtr++
            newPtr++
        }
        else if (oldItem.id < newItem.id) {
            ans.removed.push(oldItem)
            oldPtr++
        }
        else if (oldItem.id > newItem.id) {
            ans.added.push(newItem)
            newPtr++
        }
    }

    // 剩余情况处理
    while (oldPtr < LO) {
        ans.removed.push(oldArr[oldPtr])
        oldPtr++
    }
    while (newPtr < LN) {
        ans.added.push(newArr[newPtr])
        newPtr++
    }

    return ans
}
// 思路：双指针比较，利用排序后的id进行判断是哪种类型的变更
// 并且题目说层数只需要一层，所以也不用写边界条件去递归DFS


const oldList = [
    { id: 1, name: 'ceilf6', price: 100 },
    { id: 3, name: 'ceilf7', price: 100 },
    { id: 5, name: 'ceilf8', price: 200 },
    { id: 6, name: 'ceilf9', price: 200 }
]
const newList = [
    { id: 2, name: 'ceilf6', price: 100 },
    { id: 3, name: 'ceilf7', price: 100 },
    { id: 4, name: 'ceilf8', price: 200 },
    { id: 6, name: 'ceilf10', price: 200 }
]
console.log(diffList(oldList, newList, 'id'))