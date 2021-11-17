class Depend {
  constructor() {
    //防止重复收集依赖函数
    this.reactiveFns = new Set();
  }
  Depend() {
    if (activeFn) {
      this.reactiveFns.add(activeFn);
    }
  }
  notify() {
    this.reactiveFns.forEach((fn) => {
      fn();
    });
  }
}
//vue3 reactive
/* function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      //获取对应的depend
      const depend = getDepend(target, key);
      //给depend对象中添加响应函数
      depend.Depend();
      return Reflect.get(target, key, receiver);
    },
    set(target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver);
      const depend = getDepend(target, key);
      depend.notify();
    },
  });
} */
//vue2 reactive
function reactive(obj) {
  Object.keys(obj).forEach((key) => {
    let value = obj[key];

    Object.defineProperty(obj, key, {
      get() {
        const depend = getDepend(obj, key);
        depend.Depend();
        return value;
      },
      set(newVal) {
        value = newVal;

        const depend = getDepend(obj, key);
        depend.notify();
      },
    });
  });
  return obj;
}
const targetMap = new WeakMap();
//封装一个获取depend的函数
function getDepend(target, key) {
  let map = targetMap.get(target);
  if (!map) {
    map = new Map();
    targetMap.set(target, map);
  }
  let depend = map.get(key);
  if (!depend) {
    depend = new Depend();
    map.set(key, depend);
  }
  return depend;
}

//监听对象的属性变量 Proxy/obj.defineProperty
// 响应式函数
let activeFn = null;
function watchFn(fn) {
  activeFn = fn;
  fn();
  activeFn = null;
}
const obj = {
  name: 'jl',
  age: 18,
};

const info = {
  address: '杭州市',
  height: 1.88,
};
const infoReactive = reactive(info);
const objReactive = reactive(obj);
watchFn(() => {
  console.log(infoReactive.address);
});
watchFn(() => {
  console.log(objReactive.age);
});
infoReactive.address = '仙居';
objReactive.age = 20;
