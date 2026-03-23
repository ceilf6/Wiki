import { Button, Input } from "../Products/AbstractProduct";

// 抽象工厂
export default abstract class UIComponentFactory {
    abstract createButton(): Button { }
    abstract createInput(): Input { }
}