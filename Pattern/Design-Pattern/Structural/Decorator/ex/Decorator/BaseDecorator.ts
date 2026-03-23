import IFunc from "../Interface/IFunc";

export default class BaseDecorator implements IFunc {
    // 基础的装饰器类，是不能够单独使用的
    private _wrappee: IFunc;

    constructor(wrappee: IFunc) {
        this._wrappee = wrappee
    }

    func(arg: string): void {
        this._wrappee.func(arg)
    }
}