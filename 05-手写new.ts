/*
1. 创建（或者说构造）一个全新的对象。
2. 这个新对象会被执行 [[ 原型 ]] 连接。
3. 这个新对象会绑定到函数调用的 this。
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象
*/
function _new(fn: Function, ...rest) {
  //基于fn的prototype构建对象的原型
  const thisObj = Object.create(fn.prototype);
  //将thisObj作为fn的this，继承其属性，并获取返回结果为result
  const result = fn.apply(thisObj, rest);
  //根据result对象的类型决定返回结果 如果new的函数有返回值，则会返回那个返回值
  return typeof result === 'object' ? result : thisObj;
}
