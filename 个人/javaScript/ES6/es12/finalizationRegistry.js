//监听一个对象是否被销毁
const finalizationRegistry = new FinalizationRegistry((value) => {
  console.log(value + '注册对象被销毁了');
});
console.log(FinalizationRegistry);
let obj = { name: 'jl' };
finalizationRegistry.register(obj, 'obj');

obj = null;

// obj = { name: 'obj' };
