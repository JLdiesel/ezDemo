const obj = {
  name: 'jl',
  age:18
}
//会直接在info上直接添加address属性 非原型链
const info = Object.create(obj, {
  address: {
    value: '杭州市',
    enumerable:true
  }
})
//info.hasOwnProperty('address')
//判断某个属性是不是在自身上 而不是原型链上
console.log(info.hasOwnProperty('address')); //true
console.log(info.hasOwnProperty('name'));//false  

for (const key in info) {
  console.log(key);
  //address name age
}
//判断info中能不能通过 RHS右查询到  等同于forin的检测方法
console.log('address' in info); //true
console.log('name' in info); //true
console.log(info);
// { address: '杭州市' }
console.log(info.__proto__);
// { name: 'jl', age: 18 }