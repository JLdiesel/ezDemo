/* 
“一个方法，该方法决定一个构造器对象是否认可一个对象是它的实例。由 instanceof 操作符使用”。instanceof 操作符可以用来确定一个对象实例的原型链上是否有原型。 */

class Fn {
  constructor() {
    this.x = Symbol.for('x');
  }
  static [Symbol.hasInstance](obj) {
    return obj.x && obj.x === Symbol.for('x');
  }
}
const a = new Fn();
console.log(a instanceof Fn);

const arr = [1, 2, 3];
Object.setPrototypeOf(arr, Fn.prototype);
console.log(arr instanceof Fn);

function Foo() {}
let f = new Foo();
console.log(Foo[Symbol.hasInstance](f)); // true
class Bar {}
let b = new Bar();
console.log(Bar[Symbol.hasInstance](b)); // true
