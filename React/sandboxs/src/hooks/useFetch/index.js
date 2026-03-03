import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Write a React custom hook useFetch to manage server data fetching, including auto/manual loading, error handling, and refresh capabilities.
 * @param {*} url target url
 * @param {*} options for examples: deps to trigger fetch
 * @returns 
 */
export default function useFetch(url, options) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { deps = [], defaultParams } = options
    const [reFetchIdx, setReFetchIdx] = useState(0)

    const paramsRef = useRef(defaultParams)
    // useRef 创建在渲染期间持久存在、修改不触发重渲染的容器
    // 如果不用 useRef ，那么 const run = useCallback(async (params) => { 会导致闭包，拿到的永远是初次创建时的快照
    // 而 ref 是堆上的对象，useCallback 闭包持有的是它的引用，真实值 .current 是最新的

    // 1. fetch后 Promise链
    useEffect(() => {
        const controller = new AbortController()
        // AbortController 浏览器原生API用于取消异步操作

        const params = paramsRef.current
        const query = params ? '?' + new URLSearchParams(params) : ''

        setLoading(true)
        fetch(url + query, { signal: controller.signal })
            // fetch 自身就返回 Promise // 会自动将请求到的结果 resolve 给后面
            .then(res => res.json()) // fetch 到的是 Response 对象，需要 .json() 解析
            .then(data => setData(data))
            .catch(e => setError(e))
            .finally(() => setLoading(false))
        return () => controller.abort() // 注意通过箭头函数返回清理函数，否则在组件卸载后副作用仍会执行导致警报
        // useEffect副作用清理函数会 在组件卸载时 以及 依赖项更新副作用下次执行之前 两种情况执行，常用于 AJAX请求、定时器、事件监听、WebSocket 的清理
    }, [url, ...deps])
    // 如果不包在 useEffect 中，会导致 fetch => setData => reRender => fetch => 无限循环

    // 2. async, await
    useEffect(() => {
        const controller = new AbortController()
        async function fetchData() {
            try {
                setLoading(true)

                const params = paramsRef.current
                const query = params ? '?' + new URLSearchParams(params) : ''

                const res = await fetch(url + query, { signal: controller.signal })
                setData(await res.json())
            } catch (e) {
                if (e.name !== 'AbortError') setError(e)
                // 忽略主动取消导致的error
            } finally {
                setLoading(false)
            }
        }
        fetchData()
        return () => controller.abort()
    }, [url, ...deps, reFetchIdx])

    /**
     * reFetch 函数用于主动、再次上次请求，需要通过 useRef 确保 params 是最近上次的
     */

    // 1. 更新副作用依赖触发 fetch
    const reFetch = useCallback(() => {
        // return useFetch(url, options) // hook得写在顶层，否则 hook链 顺序乱了复用错误
        setReFetchIdx(i => i + 1)
    }, [])
    // 不用 useCallback 的话，reFetch 每次渲染都会创建一个新的函数引用
    // 如果传给子组件，即使用了 React.memo ，在每次父组件重新渲染后，传给子组件的 props 中的 reFetch 变化了导致子组件无效的重渲染
    // 并且假如作为其他副作用钩子函数的依赖时，在内部调用后 reFetch 的引用会变化，导致无限递归

    // 2. 将上面副作用包装成一个函数方法，在reFetch中调用
    const run = useCallback(async (params) => { }, []) // 别忘记 useCallback 确保 run 稳定，后续才能作为副作用钩子的依赖
    const reFetch2 = useCallback(() => {
        return run(paramsRef.current)
    }, [run])
    useEffect(() => {
        const controller = new AbortController()
        run(defaultParams)
        return controller.abort()
    }, [url, ...deps, run, defaultParams])
    // ...deps 会导致 eslint 误报无法静态分析依赖, ahooks 的做法是用 useRef 保存 deps，配合 `// eslint-disable-next-line` 注释直接禁用该行检查

    return { data, loading, error, reFetch }
}