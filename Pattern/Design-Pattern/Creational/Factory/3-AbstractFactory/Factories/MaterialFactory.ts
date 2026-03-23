import UIComponentFactory from './AbstractFactory'
import { MaterialButton, MaterialInput } from "../Products/MaterialProduct";

// 具体工厂
// 负责生产 Material 风格的组件
export default class MaterialUIComponentFactory extends UIComponentFactory {
    createButton() {
        return new MaterialButton();
    }

    createInput() {
        return new MaterialInput();
    }
}