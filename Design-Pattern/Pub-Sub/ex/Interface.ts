// 发布者接口
export interface IPublisher { 
    publish: (msg: any) => void
}

// 订阅者接口
export interface ISubscriber {
    subscribe: (topic: string, publisher: IPublisher) => void
    unsubscribe: (topic: string, publisher: IPublisher) => void
}