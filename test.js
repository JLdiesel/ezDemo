// function A() {
//   this.name = 'A';
//   this.say = function () {
//     console.log(this.name);
//   }
// }
// A.prototype.look = function () {
//   console.log('A look');
// }
// function Dog() {
//   this.name='dog'
// }
// Dog.prototype = Object.create(A.prototype)
// let dog = new Dog()
// dog.look()
// console.log(Object.getOwnPropertyDescriptors(A.prototype));
const a = {
  b() {
    return this
  }
}
const c = {
  a
}
Function.prototype.hybind = function(thisArg, ...argArray) {
  // 1.获取到真实需要调用的函数
  var fn = this

  // 2.绑定this
  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg): window

  function proxyFn(...args) {
    // 3.将函数放到thisArg中进行调用
    thisArg.fn = fn
    // 特殊: 对两个传入的参数进行合并
    var finalArgs = [...argArray, ...args]
    var result = thisArg.fn(...finalArgs)
    delete thisArg.fn

    // 4.返回结果
    return result
  }

  return proxyFn
}
c.b = a.b.hybind(c)
c.b = c.b.hybind(a)
console.log(c.b()===c)
console.log(c.a.b()===a)