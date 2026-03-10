import { Observer } from "./Observer";
import { Subject } from "./Subject";

const subject = new Subject() // 主体实例对象

// 观察者
const observer1 = new Observer(1)
const observer2 = new Observer(2)

// 加入观察者列表
subject.subscribe(observer1)
subject.subscribe(observer2)

// 更新
subject.setState("new data")