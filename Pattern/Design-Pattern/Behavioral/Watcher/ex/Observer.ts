import { IObserver } from "./Interface";

export class Observer implements IObserver {
    private id: number

    constructor(id: number){
        this.id = id
    }

    update(data: any): void {
        console.log(`观察者${this.id}接收到数据: ${data}`)
    }
}