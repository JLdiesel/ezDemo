const obj = {
  name: 'jl',
  age: 18,
};

const objProxy = new Proxy(obj, {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver);
  },
  set(target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver); //与target[key]=newValue的区别:返回一个布尔值  可以用它来判断是否设置成功
  },
});

objProxy.name = 'lyj';
console.log(objProxy.name);
console.log(obj.name);
