/* “一个正则表达式方法，该方法在匹配正则表达式的索引位置拆分字符串。由 String.prototype.split()方法使用”。
String.prototype.split()方法会使用以 Symbol.split 为键的函数来对正则表达式求值。 */
class FooSplitter {
  static [Symbol.split](target) {
    return target.split('foo');
  }
}
console.log('barfoobaz'.split(FooSplitter));
// ["bar", "baz"]
class StringSplitter {
  constructor(str) {
    this.str = str;
  }
  [Symbol.split](target) {
    return target.split(this.str);
  }
}
console.log('barfoobaz'.split(new StringSplitter('foo')));
// ["bar", "baz"]
