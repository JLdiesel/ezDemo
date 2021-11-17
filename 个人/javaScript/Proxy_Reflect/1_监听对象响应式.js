const obj = {
  name: 'jl',
  age: 18,
};
Object.keys(obj).forEach((key) => {
  let value = obj[key];
  Object.defineProperty(obj, key, {
    get: function () {
      console.log(`监听${key}访问`);
      return value;
    },
    set: function (newValue) {
      console.log(`监听${key}设置`);
      value = newValue;
    },
  });
});

obj.name = 'bb';
obj.age = 'bb';

console.log(obj.name);
console.log(obj.age);
