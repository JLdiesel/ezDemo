const obj = {
  name: 'jl',
  age: 18,
};
const objProxy = new Proxy(obj, {
  get(target, key) {
    return target[key];
  },
  set(target, key, value) {
    target[key] = value;
  },
  //监听in的捕获器
  has(target, key) {
    console.log('123s');
    return key in target;
  },
  //监听delete的捕获器
  deleteProperty(target, key) {
    console.log('代理删除');
    delete target[key];
  },
});
objProxy.name = 'lyj';
console.log(objProxy.name);

console.log('name' in objProxy);

delete objProxy['name'];
console.log(objProxy);
