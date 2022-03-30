/*
 * @Author: your name
 * @Date: 2022-03-01 10:53:33
 * @LastEditTime: 2022-03-01 11:07:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web\学习代码\个人\vuejs设计与实现\4_响应系统的作用与实现\响应式系统一代.ts
 */
//使用set的问题:被操作的目标字段和副作用函数之间没有建立明确的关联关系；
// 当读取属性时，无论哪个属性，都会收集副作用函数，设置属性时，无论哪个属性，都会触发所有副作用函数；

const bucket = new Set<() => void>();
//用一个全局变量存储被注册的副作用函数
let activeEffect: () => void;
//注册副作用函数
function effect(fn: () => void) {
  activeEffect = fn;
  fn();
}

const data = { text: '123' };
const obj = new Proxy(data, {
  //拦截读取操作
  get(target, key) {
    //如果有副作用函数则添加到桶中
    if (activeEffect) {
      bucket.add(activeEffect);
    }
    return target[key];
  },
  set(target, key, newVal) {
    //当设置属性时触发副作用函数
    target[key] = newVal;
    bucket.forEach((fn) => fn());
    return true;
  },
});
effect(() => {
  console.log(obj.text);
});
setTimeout(() => {
  obj.text = '12312';
}, 3000);
obj.text = '666';
export {};
