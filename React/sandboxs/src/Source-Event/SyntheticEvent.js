/**
 * 合成事件对象类
 */
export default class SyntheticEvent {
    constructor(e) {
        this.nativeEvent = e // 保存原生事件对象
    }

    // 合成事件对象提供的、和原生DOM同名的阻止冒泡的方法，使用者无感
    stopPropagation() {
        this._stopPropagation = true // 记录状态
        if (this.nativeEvent.stopPropagation) {
            // 调用原生方法来实现阻止
            this.nativeEvent.stopPropagation()
        }
    }
}