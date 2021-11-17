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
const obj = {
  name: 'jl',
  age: 18,
};

//监听对象的属性变量 Proxy/obj.defineProperty
const objProxy = new Proxy(obj, {
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
// 响应式函数
let activeFn = null;
function watchFn(fn) {
  activeFn = fn;
  fn();
  activeFn = null;
}
watchFn(foo);
watchFn(ages);
// watchFn(bar);

function foo() {
  console.log('name改变了');
  console.log(objProxy.name);
}
function ages() {
  console.log('age改变了');
  console.log(objProxy.age);
}
function bar() {
  console.log('其他函数');
}
// const objMap = new Map();
// objProxy.name = 'lyj';
objProxy.age = 18;
// const targetMap = new WeakMap();
// targetMap.set(obj, objMap);
// targetMap.get(obj).get('name');
