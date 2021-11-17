class Depend {
  constructor() {
    this.reactiveFns = [];
  }
  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn);
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
    return Reflect.get(target, key, receiver);
  },
  set(target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver);
    const depend = getDepend(target, key);
    depend.notify();
  },
});
// 响应式函数
const depend = new Depend();
function watchFn(fn) {
  depend.addDepend(fn);
}
watchFn(foo);
watchFn(bar);
function foo() {
  console.log('name改变了');
  console.log(objProxy.name);
}
function bar() {
  console.log('其他函数');
}
// const objMap = new Map();
objProxy.name = 'lyj';
// objProxy.name = 'jl';
// const targetMap = new WeakMap();
// targetMap.set(obj, objMap);
// targetMap.get(obj).get('name');
