function workLoopConcurrent{
    // 如果还有任务，并且时间切片还有剩余的时间
    while (workInProgress !== null && !shouldYield()) {
        performUnitOfWork(workInProgress);
    }
}

function shouldYield() {
    // 当前时间是否大于过期时间
    // 其中 deadline = getCurrentTime() + yieldInterval
    // yieldInterval 为调度器预设的时间间隔，默认为 5ms
    return getCurrentTime() >= deadline;
}