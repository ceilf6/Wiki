/**
 * 用于收集所有 type 类型事件的回调函数
 * @param {*} type 事件类型
 * @param {*} node 开始FiberNode
 */
const collectPath = (type, node) => {
    const eventName = "bind" + type // 如 bindCLICK

    const callbacks = [];
    // 如果不是 HostRootFiber, 就一直往上
    while (node && node.tag !== 3) { // tag为3即 ReactDOM.createRoot() 挂载的容器元素
        const { memoizedProps, tag } = node
        // memoizedProps: 上一次 commit 后缓存下来的 props
        if (tag === 5) {
            // 如果 tag 是 5 说明是 DOM 元素对应的 FiberNode
            if (memoizedProps && Object.keys(memoizedProps).includes(eventName)) {
                // 绑定了对应类型的事件
                // 需要进行收集
                const callbackObj = {
                    type: memoizedProps[eventName]
                }
                callbacks.push(callbackObj)
            }
        }
        node = node.return // 无论 tag 是什么，都继续向上
    }
    return callbacks
}

export default collectPath