// 观察者接口
export interface IObserver {
    update(data: any): void;
}

// 发布者接口
export interface ISubject {
    subscribe(observer: IObserver): void; // 订阅
    unsubscribe(observer: IObserver): void; // 取消订阅
    notifyObservers(): void; // 通知所有观察者
}