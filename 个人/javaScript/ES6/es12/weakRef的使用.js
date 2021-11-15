//WeakRef
const finalizationRegistry = new FinalizationRegistry((value) => {
  console.log(value + '注册对象被销毁了');
});
console.log(FinalizationRegistry);
let obj = { name: 'jl' };
let info = new WeakRef(obj);
// let info = obj;
finalizationRegistry.register(info, 'info');
finalizationRegistry.register(obj, 'obj');
console.log(info.deref().name); //jl
obj = null;
setTimeout(() => {
  console.log(info.deref().name); //报错 undefined
}, 10000);
// obj = { name: 'obj' };
