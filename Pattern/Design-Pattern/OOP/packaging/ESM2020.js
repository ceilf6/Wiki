class Person {
    #name;
    #age;

    constructor(name, age) {
        this.#name = name;
        this.#age = age;
    }

    #privateMethod() {
        console.log("这是一个私有方法");
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }
}

const p = new Person("John", 20);
console.log(p.name);
p.name = "zhangsan";
console.log(p.name);
console.log(p.#name) // SyntaxError: Private field '#name' must be declared in an enclosing class
p.#privateMethod() // SyntaxError: Private field '#privateMethod' must be declared in an enclosing class