// 响应式函数
const reactiveFns = [];
function watchFn(fn) {
  reactiveFns.push(fn);
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
reactiveFns.forEach((fn) => fn());
