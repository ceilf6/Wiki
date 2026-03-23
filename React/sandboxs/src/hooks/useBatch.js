import { useRef, useCallback, useEffect } from 'react'

export default function useBatch(fn, time) {
    const timer = useRef(null)
    const argsArr = useRef([])
    const head = useRef(0) // 避开 shift() 的 O(n) 性能开销
    const fnRef = useRef(fn)

    // fn 加到 useCallback 依赖数组的话不能保证 调用时 是新的 fn
    // 所以最好还是 useRef 维护
    useEffect(() => {
        fnRef.current = fn
    }, [fn])

    // 别忘记清理计时器！
    useEffect(() => {
        return () => {
            if (timer.current) {
                clearTimeout(timer.current)
            }
        }
    }, [])

    return useCallback(function (...args) {
        argsArr.current.push(args)
        if (timer.current)
            clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            while (head.current < argsArr.current.length) {
                fnRef.current.apply(this, argsArr.current[head.current])
                head.current++
            }
            // 防止内存泄漏
            head.current = 0
            argsArr.current = []
        }, time)
    }, [time])
}