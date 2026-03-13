function solve(n) {
    const ans = []
    const cur = []

    // 求路径的话不适合回溯，面试官说错了
    function dfs(step) {
        if (step < 0) return

        if (step === 0) {
            ans.push([...cur])
            return
        }

        cur.push(1)
        dfs(step - 1)
        cur.pop()

        cur.push(2)
        dfs(step - 2)
        cur.pop()
    }

    dfs(n)
    return ans
}