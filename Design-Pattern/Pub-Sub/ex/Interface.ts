// 订阅者 和 发布者 不会有任何直接接触，所有事情都是 中间代理人 实现
// 在 多对多 的情景下，通过 主题topic 进行区分通信通道，订阅者和发布者的所有方法都以主题为准、而不是指定订阅者或发布者的ID信息等

// 发布者接口
export interface IPublisher {
    // 发布信息
    publish: (topic: string, message: any) => void
}

// 订阅者接口
export interface ISubscriber {
    // 订阅
    subscribe: (topic: string) => void

    // 取消订阅
    unsubscribe: (topic: string) => void

    // 接收信息
    receive: (message: any) => void;
}

// 代理层中转
export interface IBroker {
    // 订阅
    subscribe: (topic: string, subscriber: ISubscriber) => void

    // 取消订阅
    unsubscribe: (topic: string, subscriber: ISubscriber) => void

    // 发布消息
    publish: (topic: string, message: any) => void
}