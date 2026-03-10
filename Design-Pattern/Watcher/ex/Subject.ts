import { IObserver,ISubject } from "./Interface";

export class Subject implements ISubject {
    private observers: IObserver[] = [] // 存储观察者列表

    private state: any; // 内部维护的状态数据

    getState(): any{
        return this.state
    }

    setState(state: any){
        this.state = state
        this.notifyObservers() // 更新之后通知所有观察者
    }

    subscribe(observer: IObserver): void {
        const isExist = this.observers.includes(observer);
        if(!isExist){
            this.observers.push(observer)
        }
    }

    unsubscribe(observer: IObserver): void {
        const idx = this.observers.indexOf(observer)
        if(idx !== -1){
            this.observers.splice(idx, 1)
        }
    }

    notifyObservers(): void {
        this.observers.forEach((observer) => {
            observer.update(this.state)
        })
    }
}