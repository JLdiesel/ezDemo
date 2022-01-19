/* “一个函数值，该函数作为创建派生对象的构造函数”。
这个属性在内置类型中最常用，用于对内置类型实例方法的返回值暴露实例化派生对象的方法。
用 Symbol.species 定义静态的获取器（getter）方法，可以覆盖新创建实例的原型定义 */
class Bar extends Array {}
class Baz extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}
let bar = new Bar();
console.log(bar instanceof Array); // true
console.log(bar instanceof Bar); // true

bar = bar.concat('bar');

console.log(bar); //Bar(1) [ 'bar' ]
console.log(bar instanceof Array); // true
console.log(bar instanceof Bar); // true

let baz = new Baz();
console.log(baz instanceof Array); // true
console.log(baz instanceof Baz); // true
console.log(baz); //Baz(0) []

// baz = baz.concat('baz');
baz = baz.map((item) => item);
console.log(baz); //[ 'baz' ]
console.log(baz instanceof Array); // true
console.log(baz instanceof Baz); // false
