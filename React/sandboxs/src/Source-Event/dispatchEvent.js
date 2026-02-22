import SyntheticEvent from "./SyntheticEvent"
import collectPath from "./collectPath"
import triggerEventFlow from "./triggerEventFlow"
import { order } from "./triggerEventFlow"

/**
 * 
 * @param {*} e 原生事件对象
 * @param {*} type 事件类型 - 大写
 */
const dispatchEvent = (e, type) => {
    // 实例化一个合成事件对象
    const se = new SyntheticEvent(e)

    // 触发事件的元素
    const ele = e.target
    // 拿到 ele 对应的 FiberNode
    // React 16: __reactInternalInstance$xxx  React 17+: __reactFiber$xxx
    let fiberNode;
    for (let prop in ele) {
        if (
            prop.toLocaleLowerCase().includes("internalinstance") // React16
            || prop.toLocaleLowerCase().includes("fiber") // React17
        ) {
            fiberNode = ele[prop]
        }
    }
    // 收集 FiberNode 到根元素路径上的该事件类型对应的回调函数
    const callbacks = collectPath(type, fiberNode)

    // 捕获
    triggerEventFlow(callbacks, type, se, order["CAPTURE"])

    // 冒泡
    if (!se._stopPropagation) // 前提：没有阻止冒泡
        triggerEventFlow(callbacks, type, se, order["BUBBLE"])
}

export default dispatchEvent