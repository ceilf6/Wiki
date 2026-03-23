function Person(name, age) {
    // 函数作用域 模拟实现私有属性
    let _name = name;
    let _age = age;

    // 私有方法
    function privateMethod() {
        console.log("这是一个私有方法");
    }

    // 提供相应的 getter 和 setter 方法
    this.getName = function () {
        return _name; // 闭包获取
    };

    this.setName = function (name) {
        _name = name;
    };
}
const p1 = new Person("John", 20);
console.log(p1._name);
console.log(p1.getName())