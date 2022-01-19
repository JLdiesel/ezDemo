/* “一个方法，该方法将对象转换为相应的原始值。由 ToPrimitive 抽象操作使用”。
很多内置操作都会尝试强制将对象转换为原始值，包括字符串、数值和未指定的原始类型。 */
class Foo {}
let foo = new Foo();
console.log(3 + foo); // "3[object Object]"
console.log(3 - foo); // NaN
console.log(String(foo)); // "[object Object]"
class Bar {
  constructor() {
    this[Symbol.toPrimitive] = function (hint) {
      console.log(hint, 'hint');
      //   hint 希望转化成的类型  +号为默认  -号为数字  String为string
      switch (hint) {
        case 'number':
          return 3;
        case 'string':
          return 'string bar';
        case 'boolean':
          return false;
        case 'default':
        default:
          return 'default bar';
      }
    };
  }
}
let bar = new Bar();
console.log(3 + bar); // "3default bar"
console.log(3 - bar); // 0
console.log(String(bar)); // "string bar"
console.log(RegExp(bar)); // "/string bar/"
