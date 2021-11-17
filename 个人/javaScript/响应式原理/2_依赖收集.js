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

// 响应式函数
const depend = new Depend();
function watchFn(fn) {
  depend.addDepend(fn);
}
const obj = {
  name: 'jl',
  age: 18,
};
function foo() {
  console.log('name改变了');
  console.log(obj.name);
}
watchFn(foo);
watchFn(bar);
function bar() {
  console.log('其他函数');
}
obj.name = 'lyj';
depend.notify();
