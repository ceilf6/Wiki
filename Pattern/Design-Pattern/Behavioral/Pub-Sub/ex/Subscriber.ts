// 订阅者
import { ISubscriber, IBroker, IPublisher } from "./Interface";

export default class Subscriber implements ISubscriber {
    private _broker: IBroker;
    private _id: number

    constructor(id: number, broker:IBroker){
        this._broker = broker
        this._id = id
    }

    subscribe(topic: string):void {
        console.log(`订阅者${this._id}订阅主题${topic}`)
        this._broker.subscribe(topic, this)
    }

    unsubscribe(topic: string):void{
        console.log(`订阅者${this._id}取消订阅主题${topic}`)
        this._broker.unsubscribe(topic, this)
    }

    receive(message: any):void{
        console.log(`订阅者${this._id}接收到消息：${message}`)
    }
}