class Person{
  constructor(name){
    this.name=name
  }
  runnding(){
  console.log('runnding')
  }
}
//babel转译
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
/**
 * 
 * @param {*} target 类的原型对象
 * @param {*} props 要添加的方法对象数组[{
 *      key:方法名
 *      value:方法具体函数
 *  }]
 */

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    //从数组中取出每一个方法对象
    var descriptor = props[i];
    //配置可选项
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  //传入Person.prototype 添加public方法
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  //传入Person函数本身 添加static方法
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

//立即执行函数  1.纯函数(webpack优化)  2.防止重名属性污染全局
///*#__PURE__*/ webpack压缩  tree-shaking 
//没有副作用
//如果没有用到这个函数，webpack压缩时会直接删除该代码
var Person = /*#__PURE__*/ (function () {
  "use strict";

  function Person(name) {
    //判断是否是用new关键字来创建对象
    _classCallCheck(this, Person);

    this.name = name;
  }
  //把方法添加到function中，
  _createClass(Person, [
    {
      key: "runnding",
      value: function runnding() {
        console.log("runnding");
      }
    }
  ],
    //静态方法放在第三个参数
    [
      {
        key: "shopping",
        value: function shopping() {
          console.log("go shopping");
        }
      }
    ]);

  return Person;
})();
