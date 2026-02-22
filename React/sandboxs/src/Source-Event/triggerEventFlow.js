export const order = { // enum order{
    CAPTURE: 1, // 捕获
    BUBBLE: 2 // 冒泡
}

/**
 * 遍历并执行（根据类型是捕获还是冒泡决定顺序）
 * @param {*} callbacks 收集到的回调函数数组
 * @param {*} type 事件类型
 * @param {*} se 合成事件对象
 * @param {*} order 捕获或是冒泡
 */
const triggerEventFlow = (callbacks, type, se, order) => {
    if (order === 1) {
        for (let i = callbacks.length - 1; i >= 0; --i) {
            const callback = callbacks[i].type
            if (callback) callback.call(null, se)
            if (se._stopPropagation) break
        }
    }
    else if (order === 2) {
        for (let i = 0; i < callbacks.length; ++i) {
            const callback = callbacks[i].type
            if (callback) callback.call(null, se)
            if (se._stopPropagation) break
        }
    }
    else {
        throw new Error("unexpected order")
    }
}

export default triggerEventFlow