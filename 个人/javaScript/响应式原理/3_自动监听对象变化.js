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
objProxy.name = 'lyj';
objProxy.name = 'jl';
