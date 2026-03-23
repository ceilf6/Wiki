export class Person {
  private _name: string;
  private _age: number;

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }

  private privateMethod(): void {
    console.log("这是一个私有方法");
  }

  sayHello() {
    console.log("Hello");
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get age() {
    return this._age;
  }

  // 可以在 get 和 set 中进行额外操作，有点类似于 Proxy 
  set age(value) {
    if (value > 100) {
      console.log("年龄不能大于100");
      this._age = 20;
    } else {
      this._age = value;
    }
  }
}

const p = new Person("John", 18);
console.log(p.name);
p.age = 200;
console.log(p.age);
// console.log(p._age) // 属性“_age”为私有属性，只能在类“Person”中访问