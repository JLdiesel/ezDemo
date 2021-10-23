//奇葩面试题
//==:对象==数字 
//1 调用对象的[Symbol.toPrimitive]方法
//2 没有则看对象.valueOf()，验证是否是原始值
//3 如果不是原始值类型， 对象.toString()变为字符串
//4 字符串变为数字比较

var a = {
  i:0
};
a[Symbol.toPrimitive] = function (hint) {
  //hint:default string number
  return ++this.i
}
// a.toString = function () {
//   return ++this.i
// }
if (a == 1 && a == 2 && a == 3) {
  console.log('ok');
}


