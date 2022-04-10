/*
 * @Author: your name
 * @Date: 2022-03-01 10:58:42
 * @LastEditTime: 2022-03-01 11:16:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web\学习代码\个人\vuejs设计与实现\4_响应系统的作用与实现\响应式系统二代(wekmap).ts
 */
/* 
Target1
   key 
      effectFn1
      effectFn2
Target2
   key1 
      effectFn1
Target2
   key2 
      effectFn3
Target2
   key3 
      effectFn3
 3层树形结构
*/
const bucket = new WeakMap<{}, Map<string | symbol, Set<() => void>>>();

let activeEffect: () => void;
function effect(fn: () => void) {
  activeEffect = fn;
  fn();
}
const data = { text: '123' };
const obj = new Proxy(data, {
  get(target, key) {
    //没有activeEffect 直接return
    if (!activeEffect) return;
    //根据target从桶中获取depsMap
    let depsMap = bucket.get(target);
    //如果不存在，则需要新建一个Map与target关联
    if (!depsMap) {
      bucket.set(
        target,
        (depsMap = new Map<string | symbol, Set<() => void>>())
      );
    }
    //再根据key从depsMap中取得deps  deps为set类型，存储副作用函数
    let deps = depsMap.get(key);
    //如果不存在，则需要新建一个Set与key关联
    if (!deps) {
      depsMap.set(key, (deps = new Set<() => void>()));
    }
    //将副作用函数添加到Set中
    deps.add(activeEffect);
    return target[key];
  },
  set(target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
    return true;
  },
});
function trigger(target, key) {
  //通过target对象从weakmap中获取map
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  //通过key从map中获取副作用函数set
  const effects = depsMap.get(key);
  //执行副作用函数
  effects && effects.forEach((fn) => fn());
}
export { effect };
