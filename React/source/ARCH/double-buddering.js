/**
 * 
 * @param {*} current 前缓存区、当前UI的 Fiber Node
 * @param {*} workInProgress 后缓存区、内存中的 Fiber Node
 */
function cloneChildFibers(current, workInProgress) {
    // ...
}

// 两个 FiberNode 会通过 alternate 属性相互指向
current.alternate = workInProgress;
workInProgress.alternate = current;