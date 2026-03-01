// === 观察者模式：依赖收集和通知
let activeEffect = null;

function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

class Dep {
  constructor() {
    this.subs = new Set();
  }
  depend() {
    if (activeEffect) {
      this.subs.add(activeEffect);
    }
  }
  notify() {
    this.subs.forEach(fn => fn());
  }
}

// === 对象响应化
function reactive(obj) {
    Object.keys(obj).forEach(key => {
      let value = obj[key];
      const dep = new Dep();
  
      // 深层递归（简化版）
      if (typeof value === 'object' && value !== null) {
        value = reactive(value);
      }
  
      Object.defineProperty(obj, key, {
        get() {
          dep.depend();
          return value;
        },
        set(newVal) {
          if (newVal === value) return;
          value = newVal;
          dep.notify();
        }
      });
    });
  
    return obj;
  }

// === ref 单值响应化本质上是 用对象包一层 value
function ref(rawValue) {
    let value = rawValue;
    const dep = new Dep();
  
    return {
      get value() {
        dep.depend();
        return value;
      },
      set value(newVal) {
        if (newVal === value) return;
        value = newVal;
        dep.notify();
      }
    };
  }