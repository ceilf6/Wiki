import dispatchEvent from "./dispatchEvent"

/**
 * 给根元素绑定事件，利用原生事件委托，进行事件收集
 * @param {*} container 根元素
 * @param {*} type 事件类型
 */
const addRootEvent = (container, type) => {
    container.addEventListener(type, e => { // e 原生事件对象
        // 事件派发
        dispatchEvent(e, type.toUpperCase())
    })
}

export default addRootEvent