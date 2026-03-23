import IFunc from "./Interface/IFunc";

export default class Func implements IFunc {
    func(arg: string): void {
        console.log(`Func => ${arg}`)
    }
}