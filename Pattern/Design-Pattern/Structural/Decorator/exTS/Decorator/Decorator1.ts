export function Decorator1(ID: number): ClassDecorator {
    // ClassDecorator 本质就是函数对象
    return function (constructor: Function) {
        // 原型上面拿到方法
        const preFunc = constructor.prototype.func
        constructor.prototype.func = function (arg: string) {
            // 先调用父类(即基础装饰类)的逻辑
            preFunc.apply(this, arguments)

            // 自己的逻辑
            console.log(`ID:${ID} Decorator1 => ${arg}`)
        }
    }
}