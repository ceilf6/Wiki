// 根据 Scheduler 调度结果不同，Reconciler 协调调用方法不同

// 同步 => performSyncWorkOnRoot 会执行该方法
function workLoopSync() {
    while (workInProgress !== null) {
        workInProgress = performUnitOfWork(workInProgress)
    }
}

// 并发 => performConcurrentWorkOnRoot 会执行该方法
function workLoopConcurrent() {
    // 如果还有任务，并且时间切片还有剩余的时间
    while (workInProgress !== null && !shouldYield()) {
        // 新版本是 shouldYieldToHost() 调用的是来自 Scheduler.shouldYield()
        workInProgress = performUnitOfWork(workInProgress);
    }
}

function shouldYield() {
    // 当前时间是否大于过期时间
    // 其中 deadline = getCurrentTime() + yieldInterval
    // yieldInterval 为调度器预设的时间间隔，默认为 5ms
    return getCurrentTime() >= deadline;
}

// beginWork() 创建 FiberNode

/**
 * performUnitOfWork 创建下一个 FiberNode 对象，并且会进行链表连接
 * return, child, sibling
 */
function performUnitOfWork(curNode) {
    const children = curNode?.props?.children;
    if (children !== null && children !== undefined) {
        reconcileChildren(curNode, children);
    }

    // 深度优先：先向下，再向右，最后向上回溯找兄弟
    if (curNode.child !== null) {
        return curNode.child;
    }
    let next = curNode;
    while (next !== null) {
        if (next.sibling !== null) {
            return next.sibling;
        }
        next = next.return;
    }
    return null;
}

function reconcileChildren(returnFiber, children) {
    returnFiber.child = null;

    if (Array.isArray(children)) {
        let prevFiber = null;
        for (const element of children) {
            if (element === null || element === undefined) {
                continue;
            }
            const childFiber = beginWork(element);
            if (childFiber === null || childFiber === undefined) {
                continue;
            }
            childFiber.return = returnFiber;
            childFiber.sibling = null;
            if (prevFiber === null) {
                returnFiber.child = childFiber;
            } else {
                prevFiber.sibling = childFiber;
            }
            prevFiber = childFiber;
        }
    } else {
        const childFiber = beginWork(children);
        if (childFiber !== null && childFiber !== undefined) {
            childFiber.return = returnFiber;
            childFiber.sibling = null;
            returnFiber.child = childFiber;
        }
    }
}

// // React16 之前递归写法是无法中断的
// function performUnitOfWork(curNode) {
//     if (curNode.props.children) {
//         if (isArray(curNode.props.children)) {
//             const child = []
//             for (const el of curNode.props.children) {
//                 child.push(beginWork(el))
//             }
//             for (const i = 0; i < child.length; ++i) {
//                 child[i].sibling = child[i + 1]
//                 child[i].return = curNode
//                 performUnitOfWork(child[i])
//             }
//             child[child.length - 1].return = curNode
//             curNode.child = child
//         } else {
//             const child = beginWork(curNode.props.children)
//             child.return = curNode
//             performUnitOfWork(child)
//             curNode.child = child
//         }
//     }
// }