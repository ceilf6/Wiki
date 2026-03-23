import UIComponentFactory from './AbstractFactory'
import { AntDesignButton, AntDesignInput } from "../Products/AntDesignProduct";

// 具体工厂
// 负责生产 AntDesign 风格的组件
export default class AntDesignUIComponentFactory extends UIComponentFactory {
    createButton() {
        return new AntDesignButton();
    }

    createInput() {
        return new AntDesignInput();
    }
}