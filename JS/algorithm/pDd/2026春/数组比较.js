// 2. 新旧数组比较
function diffList(oldList, newList, key) {
    const ans = {
        added: [],
        removed: [],
        changed: []
    }

    const LO = oldList.length
    const LN = newList.length
    oldList.sort((a, b) => a.id - b.id)
    newList.sort((a, b) => a.id - b.id)
    let oldPtr = 0
    let newPtr = 0
    while (oldPtr < LO && newPtr < LN) {
        const old = oldList[oldPtr]
        const new = newList[newPtr]
        if (old.id === new.id) {
            const fields = []
            // 因为我看题目没有说新增字段，所以就直接取旧对象的属性进行比较
            const keys = Object.keysOf(old)
            for (const key of keys) {
                if (old[key] !== new [key]) {
                    fields.push({
                        field: key,
                        oldVal: old[key],
                        newVal: new [key]
                    })
                }
            }
            ans.changed.push({
                id: old.id,
                fields: fields
            })
            oldPtr++
            newPtr++
        }
        else if (old.id < new.id) {
            ans.removed.push(old)
            oldPtr++
        }
        else if (old.id > new.id) {
            ans.added.push(new)
            newPtr++
        }
    }

    // 剩余情况处理
    while (oldPtr < LO) {
        ans.removed.push(oldList[oldPtr])
        oldPtr++
    }
    while (newPtr < LN) {
        ans.added.push(newList[newPtr])
        newPtr++
    }

    return ans
}
// 思路：双指针比较，利用排序后的id进行判断是哪种类型的变更
// 并且题目说层数只需要一层，所以也不用写边界条件去递归DFS
