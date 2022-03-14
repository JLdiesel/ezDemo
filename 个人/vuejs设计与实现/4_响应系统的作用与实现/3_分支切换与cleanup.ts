/*
 * @Author: your name
 * @Date: 2022-03-01 11:20:57
 * @LastEditTime: 2022-03-01 11:27:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web\学习代码\个人\vuejs设计与实现\4_响应系统的作用与实现\3_分支切换与cleanup.ts
 */
import './2_响应式系统二代(wekmap)';
const data = { ok: true, text: 'helloworld' };
effect(() => {
  //data.ok为true时有可能会读取data.text的值从而把副作用函数关联到data.text
  //此时当data.text改变时，即使ok为false，也会执行副作用函数，但是ok为false时,无论data.text如何改变，title永远都是not
  //这仍然会导致副作用函数重新执行，即使 document.body.title的值不需要变化
  document.body.title = data.ok ? data.text : 'not';
});
const bucket = new WeakMap<{}, Map<string | symbol, Set<() => void>>>();

let activeEffect;
//解决：每次副作用函数执行时，我们可以先把它从所有与之关联的依赖集合中删除
function effect(fn: () => void) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    fn();
  };
  effectFn.deps = [];
  effectFn();
}
function cleanup(effectFn: { (): void; deps: any[] }) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    //deps是依赖集合
    const deps = effectFn.deps[i];
    //将effectFn从依赖集合中移除
    deps.delete(effectFn);
  }
  //重置effectFn.deps数组
  effectFn.deps.length = 0;
}
function track(target, key) {
  if (!activeEffect) return;
  let depsMap = (activeEffect.deps = bucket.get(target));
  if (!depsMap) bucket.set(target, (depsMap = new Map()));
  let deps = depsMap.get(key);
  if (!deps) depsMap.set(key, (deps = new Set()));
  deps.add(activeEffect);
  activeEffect.deps.push(deps);
}
