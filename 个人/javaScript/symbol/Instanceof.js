class Fn{
  constructor() {
    this.x = Symbol.for('x');
  }
  static [Symbol.hasInstance](obj) {
    return obj.x&&obj.x===Symbol.for('x')
  }
}
const a = new Fn();
console.log(a instanceof Fn);

const arr = [1, 2, 3];
Object.setPrototypeOf(arr, Fn.prototype);
console.log(arr instanceof Fn);