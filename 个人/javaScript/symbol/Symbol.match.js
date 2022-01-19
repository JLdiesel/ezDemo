/* “一个正则表达式方法，该方法用正则表达式去匹配字符串。由 String.prototype.match()方法使用” 
String.prototype.match()方法会使用以 Symbol.match 为键的函数来对正则表达式求值*/
console.log(RegExp.prototype[Symbol.match]);
// ƒ [Symbol.match]() { [native code] }
console.log('foobar'.match(/bar/));
// ["bar", index: 3, input: "foobar", groups: undefined]
/* 给这个方法传入非正则表达式值会导致该值被转换为 RegExp 对象。如果想改变这种行为，让方法
直接使用参数，则可以重新定义 Symbol.match 函数以取代默认对正则表达式求值的行为，从而让
match()方法使用非正则表达式实例。 */
class FooMatcher {
  static [Symbol.match](target) {
    //Symbol.match 函数接收一个参数， target:就是调用 match()方法的字符串实例。
    return target.includes('foo');
  }
}
console.log('foobar'.match(FooMatcher)); // true
console.log('barbaz'.match(FooMatcher)); // false

class StringMatcher {
  constructor(str) {
    this.str = str;
  }
  [Symbol.match](target) {
    return target.includes(this.str);
  }
}
console.log('foobar'.match(new StringMatcher('foo'))); // true
console.log('barbaz'.match(new StringMatcher('qux'))); // false
