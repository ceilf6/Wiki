function outer() {
    this.att = 'this from outer'
    const inner = () => {
        console.log('=== arguments', arguments)
        console.log('=== this', this)
    }
    console.log('=== prototype', inner.prototype)
    inner('inner')
    // const innerIns = new inner() // error - TypeError: inner is not a constructor
    // 由于箭头函数实例没有this和prototype ，所以自然就没有构造函数
}

new outer('arguments from outer')
// 得 new 否则严格模式下 this 为 undefined , L2要报错
