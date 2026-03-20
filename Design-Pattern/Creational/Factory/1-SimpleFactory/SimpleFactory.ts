import { ProductA } from "./ProductA";
import { ProductB } from "./ProductB";
import { IProduct } from "./Interface";

export default class SimpleFactory {
    static createProduct(type: string): IProduct {
        // 不符合开闭原则：工厂类职责过重，每次新增产品都需要更新工厂类
        switch (type) {
            case 'A':
                return new ProductA()
            case 'B':
                return new ProductB()
            default:
                throw new Error("No such product")
        }
    }
}