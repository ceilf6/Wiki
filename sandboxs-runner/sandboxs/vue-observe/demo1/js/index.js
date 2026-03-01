var vm = new Vue({
  // 配置对象
  el: '.container', // CSS选择器控制对象 - #app
  data: {
    // 界面数据
    title: '淘东手机', // -> {{title}} 来使用
    goods: goods,
  },
  // 计算属性 - 防止冗余数据，由界面数据拓展得到的数据
  computed: {
    // 计算函数
    count: function () {
      var sum = 0;
      for (var i = 0; i < this.goods.length; i++) { // 通过 this 拿到界面数据
        sum += this.goods[i].choose;
      }
      return sum;
    },
  },
});
