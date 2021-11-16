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
});
objProxy.name = 'lyj';
console.log(objProxy.name);
