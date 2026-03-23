import MaterialUIComponentFactory from "./Factories/MaterialFactory";
import AntDesignUIComponentFactory from "./Factories/AntDesignFactory";

// 使用
// 通过 materialFactory 就可以生产一套 material 风格的组件
const materialFactory = new MaterialUIComponentFactory();
const materialButton = materialFactory.createButton();
const materialInput = materialFactory.createInput();
console.log(materialButton.click())
console.log(materialInput.text())

// 通过 antDesignFactory 就可以生产一套 antDesign 风格的组件
const antDesignFactory = new AntDesignUIComponentFactory();
const antDesignButton = antDesignFactory.createButton();
const antDesignInput = antDesignFactory.createInput();
console.log(antDesignButton.click())
console.log(antDesignInput.text())