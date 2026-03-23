import { IProduct } from "./Interface";

export class ProductA implements IProduct {
    use() {
        console.log('Product A used')
    }
}