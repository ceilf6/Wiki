var aGoods = {
  pic: '.',
  title: '..',
  desc: `...`,
  sellNumber: 1,
  favorRate: 2,
  price: 3,
};

class UIGoods {
  get totalPrice() {
    return this.choose * this.data.price;
  }

  get isChoose() {
    return this.choose > 0;
  }

  constructor(g) {
    g = { ...g }; // 不影响原数据
    Object.freeze(g); // 属性只读
    Object.defineProperty(this, 'data', {
      get: function () {
        return g;
      },
      set: function () {
        throw new Error('data 属性是只读的，不能重新赋值'); // 提醒错误
      },
      configurable: false,
    });
    var internalChooseValue = 0;
    Object.defineProperty(this, 'choose', {
      configurable: false,
      get: function () {
        return internalChooseValue;
      },
      set: function (val) {
        if (typeof val !== 'number') {
          throw new Error('choose属性必须是数字');
        }
        // var temp = parseInt(val);
        var temp = ~~val; // 位运算符，相当于 parseInt(val)
        if (temp !== val) {
          throw new Error('choose属性必须是整数');
        }
        if (val < 0) {
          throw new Error('choose属性必须大于等于 0');
        }
        internalChooseValue = val;
      },
    });
    this.a = 1;
    // Object.freeze(this); // 冻结对象不能加属性
    Object.seal(this); // 用 seal 密封的话不能加但是其他属性还能改
  }
}

Object.freeze(UIGoods.prototype); // 冻结原型防止添加属性

var g = new UIGoods(aGoods);
UIGoods.prototype.haha = 'abc';
// g.data.price = 100;

console.log(g.haha);
