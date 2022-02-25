/*
 * @Author: your name
 * @Date: 2022-02-25 17:59:47
 * @LastEditTime: 2022-02-25 18:06:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web\学习代码\个人\vuejs设计与实现\2_框架设计的核心要素\2_错误处理.js
 */
let handleErr = null;
function callWithErrorHandling(fn) {
  try {
    fn && fn();
  } catch (error) {
    handleErr(error);
  }
}
export default {
  foo(fn) {
    callWithErrorHandling(fn); //此时调用的函数是添加了错误处理的函数
  },
  registerErrorHandler(fn) {
    //利用闭包把用户传的错误处理函数储存起来
    handleErr = fn;
  },
};

//
// import utils from './2_错误处理'
// utils.registerErrorHandler(err=>{  用户直接注册全局的错误处理方式，就不需要重复编写
//     console.log(err);
// })
// utils.foo(()=>{...});
