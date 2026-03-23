import BaseDecorator from "./BaseDecorator";
import IFunc from "../Interface/IFunc";

export default class Decorator1 extends BaseDecorator {
    private _ID: number

    constructor(func: IFunc, id: number) {
        // 调用父类构造，下面要先调用父类逻辑处理
        super(func)

        this._ID = id
    }

    // 部分重写
    func(arg: string): void {
        // 先调用父类(即基础装饰类)的逻辑
        super.func(arg)

        // 自己的逻辑
        console.log(`ID:${this._ID} Decorator1 => ${arg}`)
    }
}