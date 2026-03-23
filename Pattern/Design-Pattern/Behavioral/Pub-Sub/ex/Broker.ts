import { IBroker, ISubscriber, IPublisher } from "./Interface";

export default class Broker implements IBroker{
    // 每个主题 对应一个 订阅者数组
    private _subscriberArrs = new Map<string, ISubscriber[]>()

    subscribe(topic: string, subscriber: ISubscriber): void{
        const subscriberArr = this._subscriberArrs.get(topic) || []
        subscriberArr.push(subscriber)
        this._subscriberArrs.set(topic, subscriberArr)
    }

    unsubscribe(topic: string, subscriber: ISubscriber):void {
        const subscriberArr = this._subscriberArrs.get(topic) || []
        const idx = subscriberArr.indexOf(subscriber)
        if(idx!==-1)
            subscriberArr.slice(idx,1)
        this._subscriberArrs.set(topic,subscriberArr)
    }

    publish(topic: string, message: any): void {
        const subscriberArr = this._subscriberArrs.get(topic) || []
        for(const subscriber of subscriberArr){
            subscriber.receive(message)
        }
    }
}