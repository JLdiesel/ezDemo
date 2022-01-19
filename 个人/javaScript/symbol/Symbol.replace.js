// 一个正则表达式方法，该方法替换一个字符串中匹配的子串。由 String.prototype.replace()方法使用

/* 给这个方法传入非正则表达式值会导致该值被转换为 RegExp 对象。如果想改变这种行为，让方法
直接使用参数，可以重新定义 Symbol.replace 函数以取代默认对正则表达式求值的行为，从而让
replace()方法使用非正则表达式实例。返回的值没有限制： */
class FooReplacer {
  /**
   * @param {*} target 字符串实例
   * @param {*} replacement 替换字符串
   */
  static [Symbol.replace](target, replacement) {
    //Symbol.replace 函数接收两个参数，即调用 replace()方法的字符串实例和替换字符串。
    return target.split('foo').join(replacement);
  }
}
console.log('barfoobaz'.replace(FooReplacer, 'qux'));
// "barquxbaz"
class StringReplacer {
  constructor(str) {
    this.str = str;
  }
  [Symbol.replace](target, replacement) {
    return target.split(this.str).join(replacement);
  }
}
console.log('barfoobaz'.replace(new StringReplacer('foo'), 'qux'));
// "barquxbaz"
