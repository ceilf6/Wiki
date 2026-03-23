import BaseDecorator from "./BaseDecorator";
import IFunc from "../Interface/IFunc";

export default class Decorator2 extends BaseDecorator {
    private _ID: number

    constructor(func: IFunc, id: number) {
        // 调用父类构造，保存被装饰对象
        super(func)

        this._ID = id
    }

    func(arg: string): void {
        // 先调用父类的逻辑
        super.func(arg)

        // 自己的逻辑
        console.log(`ID:${this._ID} Decorator2 => ${arg}`)
        // console.log(`ceilf6 is too handsome to arouse 2\'s jealousy`)
    }
}