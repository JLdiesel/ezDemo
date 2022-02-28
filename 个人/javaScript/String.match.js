/*
 * @Author: your name
 * @Date: 2022-02-28 11:50:39
 * @LastEditTime: 2022-02-28 11:50:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web\学习代码\个人\javaScript\match.js
 */
const str = `b ab abc abbcc abcdd bbadd ffee`;
// 返回 以空格分割的含有a的字符串  [ab,abc,abbcc,abcdd,bbadd]
console.log(str.match(/([^\s]*(?=a)[^\s]*)/g));
console.log(str.match(/\S*a\S*/g));
