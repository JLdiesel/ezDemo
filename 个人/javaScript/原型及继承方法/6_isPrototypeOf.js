
const obj={
  name:'jl'
}
const info = Object.create(obj)
//判断 b.prototype是不是在a的原型链上
// a instanceof b   缺点 b只能是构造函数
// console.log(info instanceof obj );//报错
//判断 obj是不是在info的原型链上
console.log(obj.isPrototypeOf(info));//  true

//判断 Person.prototype是不是在stu的原型链上
//Person.prototype.isPrototypeOf(stu)