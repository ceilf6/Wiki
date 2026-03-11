// 发布者
import { IBroker, IPublisher } from "./Interface";

export default class Publisher implements IPublisher {
    private _broker: IBroker;
    constructor(broker: IBroker){
        this._broker = broker
    }

    publish(topic: string, message: string): void {
        console.log(`${topic}主题新增消息：${message}`)
        this._broker.publish(topic,message)
    }
}