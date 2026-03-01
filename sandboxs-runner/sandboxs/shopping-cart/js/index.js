// 数据驱动UI：第一步，先进行数据管理的逻辑实现

// 数据(对象数据逻辑的封装 → 整个界面的数据逻辑封装) → HTML → CSS → 事件

// function createUIGoods(g){
//   return {
//     data: g,
//     choose: 0, // 已经选择的数量
//   }
// }
// 用于创建对象 -> 构造函数

// 单件商品的数据
class UIGoods {
  constructor(g) {
    this.data = g;
    // this.choose = 0;
    let internalChooseValue = 0;
    Object.defineProperties(this, 'data', {
      get: function () {
        return g;
      },
      set: function () {
        throw new Error('data 属性是只读的，不能重新赋值');
      },
      configurable: false,
    });
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
    // this.totalPrice = 0; // 这个总价 = choose * data.单价 ， 所以是冗余的、最好是通过方法实现；数据冗余可能会导致数据不一致
  }
  // 获取总价；但是没有银弹：添加方法会影响效率；但是开始开发先不用管效率，尽量确保代码简洁：可维护性、可拓展性，优化是后面的事情
  getTotalPrice() {
    return this.data.price * this.choose;
  }
  // 是否选中了此件商品
  isChoose() {
    return this.choose > 0;
  }
  /* 
  增加和删减应该聚焦在商品内部，因为以后可能会需要判断库存容量等等，如果由使用者去维护的话就会导致关注点分离
  所以需要在类内部实现然后向外暴露
  */
  // 选择的数量+1
  increase() {
    this.choose++;
  }
  //   选择的数量-1
  decrease() {
    if (this.choose === 0) {
      return;
    }
    this.choose--;
  }
}

// 整个界面的数据
class UIData {
  constructor() {
    // const uiGoods = []; // 用 const 可以防止 var 的多次赋值、变量提升
    const uiGoods = goods.map(g => new UIGoods(g)); // 用 map 语法糖（得到新数组）可以更加语义化
    // for (var i = 0; i < goods.length; i++) {
    //   var uig = new UIGoods(goods[i]);
    //   uiGoods.push(uig);
    // }
    this.uiGoods = uiGoods;
    this.deliveryThreshold = 30; // 起送门槛（来自后端配置
    this.deliveryPrice = 5;
  }

  getTotalPrice() {
    // let sum = 0;
    // for (var i = 0; i < this.uiGoods.length; i++) {
    //   var g = this.uiGoods[i];
    //   sum += g.getTotalPrice();
    // }
    return this.uiGoods.reduce((sum, g) => sum + g.getTotalPrice(), 0); // 通过 reduce 进行归一
  }

  /*
  面向对象封装：面向对象设计
  把类管理的数据需要操作的都向外暴露
  */
  // 增加某件商品的选中数量
  increase(index) {
    this.uiGoods[index].increase(); // 调用对象上的方法，关注点分离，前者是一个对象数据的管理，当前是需要对所有对象进行管理
  }
  // 减少某件商品的选中数量
  decrease(index) {
    this.uiGoods[index].decrease();
  }

  // 每写完一个函数就直接关闭其，因为已经封装好了，不需要再关注
  // 得到总共的选择数量 // 界面逻辑和数据逻辑分离
  getTotalChooseNumber() {
    var sum = 0;
    for (var i = 0; i < this.uiGoods.length; i++) {
      sum += this.uiGoods[i].choose;
    }
    return sum;
  }

  // 购物车中有没有东西
  hasGoodsInCar() {
    return this.getTotalChooseNumber() > 0;
  }

  // 是否跨过了起送标准
  isCrossDeliveryThreshold() {
    return this.getTotalPrice() >= this.deliveryThreshold;
  }

  isChoose(index) {
    return this.uiGoods[index].isChoose();
  }
}

// 整个界面
class UI {
  constructor() {
    this.uiData = new UIData(); // 数据
    // 用对象收纳管理 DOM元素
    // 需要用到了就来收纳表里面找/加
    this.doms = {
      goodsContainer: document.querySelector('.goods-list'), // 动态的商品列表
      deliveryPrice: document.querySelector('.footer-car-tip'),
      footerPay: document.querySelector('.footer-pay'),
      footerPayInnerSpan: document.querySelector('.footer-pay span'),
      totalPrice: document.querySelector('.footer-car-total'),
      car: document.querySelector('.footer-car'),
      badge: document.querySelector('.footer-car-badge'),
    };
    var carRect = this.doms.car.getBoundingClientRect();

    var jumpTarget = {
      // x从左到右 y从上往下
      x: carRect.left + carRect.width / 2, // 左边距离加上宽度一半即中心
      y: carRect.top + carRect.height / 5,
    };
    this.jumpTarget = jumpTarget; // 每个跳的目标位置是一样的，可以上提

    this.createHTML(); // 当代码臃肿的时候需要解耦分离外提函数/文件
    this.updateFooter();
    this.listenEvent();
  }

  // 监听各种事件
  listenEvent() {
    this.doms.car.addEventListener('animationend', function () {
      this.classList.remove('animate'); // 隐式规则: this指向注册这个事件的元素
    });
  }

  // 根据商品数据创建商品列表元素
  /*
  1. 生成汇总 HTML 字符串，然后给 container 父元素进行赋值 - 直观开发效率高、但是执行效率低：字符串得 parse html 转换为DOM结构
  2. 一个一个创建元素 - 直接创建 DOM元素
  */
  createHTML() {
    // var html = '';
    // for (var i = 0; i < this.uiData.uiGoods.length; i++) {
    //   var g = this.uiData.uiGoods[i];
    //   html += `<div class="goods-item">
    //   <img src="${g.data.pic}" alt="" class="goods-pic">
    //   <div class="goods-info">
    //     <h2 class="goods-title">${g.data.title}</h2>
    //     <p class="goods-desc">${g.data.desc}</p>
    //     <p class="goods-sell">
    //       <span>月售 ${g.data.sellNumber}</span>
    //       <span>好评率${g.data.favorRate}%</span>
    //     </p>
    //     <div class="goods-confirm">
    //       <p class="goods-price">
    //         <span class="goods-price-unit">￥</span>
    //         <span>${g.data.price}</span>
    //       </p>
    //       <div class="goods-btns">
    //         <i index="${i}" class="iconfont i-jianhao"></i>
    //         <span>${g.choose}</span>
    //         <i index="${i}" class="iconfont i-jiajianzujianjiahao"></i>
    //       </div>
    //     </div>
    //   </div>
    // </div>`; // 用模版字符串 ` ` 就无须进行 \n 转义且动态替换
    // }
    // this.doms.goodsContainer.innerHTML = html;

    // 方法二：通过一个一个创建 DOM 元素的方式
    for (var i = 0; i < this.uiData.uiGoods.length; i++) {
      var g = this.uiData.uiGoods[i];

      // 创建最外层的商品容器
      var goodsItem = document.createElement('div');
      goodsItem.className = 'goods-item';

      // 创建商品图片
      var goodsPic = document.createElement('img');
      goodsPic.src = g.data.pic;
      goodsPic.alt = 'picture for ' + g.data.title;
      goodsPic.className = 'goods-pic';

      // 创建商品信息容器
      var goodsInfo = document.createElement('div');
      goodsInfo.className = 'goods-info';

      // 创建商品标题
      var goodsTitle = document.createElement('h2');
      goodsTitle.className = 'goods-title';
      goodsTitle.textContent = g.data.title;

      // 创建商品描述
      var goodsDesc = document.createElement('p');
      goodsDesc.className = 'goods-desc';
      goodsDesc.textContent = g.data.desc;

      // 创建销售信息
      var goodsSell = document.createElement('p');
      goodsSell.className = 'goods-sell';
      var sellNumberSpan = document.createElement('span');
      sellNumberSpan.textContent = '月售 ' + g.data.sellNumber;
      var favorRateSpan = document.createElement('span');
      favorRateSpan.textContent = '好评率' + g.data.favorRate + '%';
      goodsSell.appendChild(sellNumberSpan);
      goodsSell.appendChild(favorRateSpan);

      // 创建确认区域容器
      var goodsConfirm = document.createElement('div');
      goodsConfirm.className = 'goods-confirm';

      // 创建价格区域
      var goodsPrice = document.createElement('p');
      goodsPrice.className = 'goods-price';
      var priceUnitSpan = document.createElement('span');
      priceUnitSpan.className = 'goods-price-unit';
      priceUnitSpan.textContent = '￥';
      var priceValueSpan = document.createElement('span');
      priceValueSpan.textContent = g.data.price;
      goodsPrice.appendChild(priceUnitSpan);
      goodsPrice.appendChild(priceValueSpan);

      // 创建按钮区域
      var goodsBtns = document.createElement('div');
      goodsBtns.className = 'goods-btns';
      // 减号按钮
      var minusBtn = document.createElement('i');
      minusBtn.className = 'iconfont i-jianhao';
      minusBtn.setAttribute('index', i);
      // 数量显示
      var chooseSpan = document.createElement('span');
      chooseSpan.textContent = g.choose;
      // 加号按钮
      var plusBtn = document.createElement('i');
      plusBtn.className = 'iconfont i-jiajianzujianjiahao';
      plusBtn.setAttribute('index', i);
      goodsBtns.appendChild(minusBtn);
      goodsBtns.appendChild(chooseSpan);
      goodsBtns.appendChild(plusBtn);

      // 组装确认区域
      goodsConfirm.appendChild(goodsPrice);
      goodsConfirm.appendChild(goodsBtns);

      // 组装商品信息
      goodsInfo.appendChild(goodsTitle);
      goodsInfo.appendChild(goodsDesc);
      goodsInfo.appendChild(goodsSell);
      goodsInfo.appendChild(goodsConfirm);

      // 组装商品项
      goodsItem.appendChild(goodsPic);
      goodsItem.appendChild(goodsInfo);

      // 添加到商品列表容器
      this.doms.goodsContainer.appendChild(goodsItem);
    }
  }

  increase(index) {
    this.uiData.increase(index);
    this.updateGoodsItem(index);
    this.updateFooter();
    this.jump(index);
  }

  decrease(index) {
    this.uiData.decrease(index);
    this.updateGoodsItem(index);
    this.updateFooter();
  }
  // 更新某个商品元素的显示状态 - active
  updateGoodsItem(index) {
    var goodsDom = this.doms.goodsContainer.children[index];
    if (this.uiData.isChoose(index)) {
      goodsDom.classList.add('active');
    } else {
      goodsDom.classList.remove('active');
    }
    var span = goodsDom.querySelector('.goods-btns span'); // 根据DOM的id选择目标后通过uiData更新数据
    span.textContent = this.uiData.uiGoods[index].choose;
  }
  // 更新页脚 - 购物车
  updateFooter() {
    // 得到总价数据
    var total = this.uiData.getTotalPrice();
    // 设置配送费
    this.doms.deliveryPrice.textContent = `配送费￥${this.uiData.deliveryPrice}`;
    // 设置起送费还差多少
    if (this.uiData.isCrossDeliveryThreshold()) {
      // 到达起送点
      this.doms.footerPay.classList.add('active');
    } else {
      this.doms.footerPay.classList.remove('active');
      // 更新还差多少钱
      var dis = this.uiData.deliveryThreshold - total;
      dis = Math.round(dis); // 别忘记四舍五入，否则会造成小数点后两位丢失，导致数据不准确
      this.doms.footerPayInnerSpan.textContent = `还差￥${dis}元起送`;
    }
    // 设置总价
    this.doms.totalPrice.textContent = total.toFixed(2);
    // 设置购物车的样式状态
    if (this.uiData.hasGoodsInCar()) {
      this.doms.car.classList.add('active');
    } else {
      this.doms.car.classList.remove('active');
    }
    // 设置购物车中的数量
    this.doms.badge.textContent = this.uiData.getTotalChooseNumber();
  }

  // 购物车动画
  carAnimate() {
    this.doms.car.classList.add('animate');
  }
  // 动画: 实现从初始位置到结束位置的中间过渡
  // 抛物线跳跃的元素
  jump(index) {
    // 找到对应商品的加号
    var btnAdd = this.doms.goodsContainer.children[index].querySelector(
      '.i-jiajianzujianjiahao'
    );
    var rect = btnAdd.getBoundingClientRect();
    var start = {
      x: rect.left,
      y: rect.top,
    };
    // 跳吧
    var div = document.createElement('div');
    div.className = 'add-to-car';
    var i = document.createElement('i');
    i.className = 'iconfont i-jiajianzujianjiahao';
    // 设置初始位置
    div.style.transform = `translateX(${start.x}px)`;
    i.style.transform = `translateY(${start.y}px)`;
    div.appendChild(i);
    document.body.appendChild(div);
    // 由于浏览器为了优化性能会批量合并 DOM操作（先加到任务队列然后会合并），所以如果中间不强行渲染的话就会合并成最终状态
    // 读属性就会立即reflow强行渲染
    // div.clientWidth;
    // 用 rAF 等待下一帧渲染后再设置结束位置
    requestAnimationFrame(() => { // （确保了不会合并DOM操作，且不需要像读属性那样reflow，其本质就是等操作完成后）
      /*
      第一个 rAF：在本帧渲染前执行
      第二个 rAF：在下一帧渲染前执行
      */
      requestAnimationFrame(() => {
        div.style.transform = `translateX(${this.jumpTarget.x}px)`;
        i.style.transform = `translateY(${this.jumpTarget.y}px)`;
        // i 元素用于控制纵向
      });
    });

    // 设置结束位置
    // div.style.transform = `translateX(${this.jumpTarget.x}px)`;
    // i.style.transform = `translateY(${this.jumpTarget.y}px)`;
    var that = this;
    div.addEventListener(
      'transitionend',
      function () {
        div.remove();
        that.carAnimate();
      },
      {
        // 原先会因为 i 元素冒泡加上自身触发两次
        once: true, // 事件仅触发一次
      }
    );
  }
}

var ui = new UI();

// 事件 - 一般先写完功能，最后挂载事件
// 通过事件委托，在父元素容器上进行统一处理即可
ui.doms.goodsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('i-jiajianzujianjiahao')) { // 触发事件中包含加号
    var index = +e.target.getAttribute('index'); // 通过目标的自定义属性拿到（加减号上的index
    ui.increase(index);
  } else if (e.target.classList.contains('i-jianhao')) {
    var index = +e.target.getAttribute('index');
    ui.decrease(index);
  }
});

// 可拓展性
window.addEventListener('keypress', function (e) {
  if (e.code === 'Equal') {
    ui.increase(0);
  } else if (e.code === 'Minus') {
    ui.decrease(0);
  }
});
