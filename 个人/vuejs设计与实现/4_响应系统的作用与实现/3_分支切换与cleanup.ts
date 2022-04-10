/*
 * @Author: your name
 * @Date: 2022-03-01 11:20:57
 * @LastEditTime: 2022-03-01 11:27:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web\学习代码\个人\vuejs设计与实现\4_响应系统的作用与实现\3_分支切换与cleanup.ts
 */

interface effectFn {
  (): void;
  deps: Set<() => void>[];
}
let activeEffect: {
  (): void;
  deps: Set<() => void>[];
} | null;
const data = { ok: true, text: 'helloworld' };
const obj = new Proxy(data, {
  get<T>(target: T, key: keyof T) {
    track(target, key);
    return target[key];
  },
  set<T>(target: T, key: keyof T, newVal: T[keyof T]) {
    target[key] = newVal;
    trigger(target, key);
    return true;
  },
});
const bucket = new WeakMap<
  {},
  Map<string | number | symbol, Set<() => void>>
>();
let text = '';

//解决：每次副作用函数执行时，我们可以先把它从所有与之关联的依赖集合中删除
function effect(fn: () => void) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    fn();
    activeEffect = null;
  };
  effectFn.deps = new Array<Set<() => void>>();
  effectFn();
}

function cleanup(effectFn: effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    //deps是依赖集合
    const deps = effectFn.deps[i];
    //将effectFn从依赖集合中移除
    deps.delete(effectFn);
  }
  //重置effectFn.deps数组
  effectFn.deps.length = 0;
}
/* 
first 
fn()
data.ok ->fn  fn.deps=[data.ok,data.text]
data.text ->fn
set data.text
fn()    fn.deps=[]

data.ok ->fn  fn.deps=[data.ok,data.text]
data.text ->fn
*/
//set时触发
function trigger<T>(target: T, key: keyof T) {
  //通过target对象从weakmap中获取map
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  //通过key从map中获取副作用函数set
  const effects = depsMap.get(key);
  //执行副作用函数

  //effects && effects.forEach((fn) => fn()); //删除
  //fn是一个个副作用函数，每次副作用函数执行时会cleanup清除依赖 deps.delete(effectFn);
  //但是副作用函数的执行又会重新执行get方法 执行  deps.add(activeEffect) 添加依赖;
  //所以又会往函数里面添加依赖，一边清除依赖一边添加依赖，而此时对于effects的遍历还在执行中，一个fn执行完又会执行下一个fn，
  /* 
  相当于
  const set = new Set([1]);
set.forEach((item) => {
  set.delete(1);
  set.add(1);
  console.log('遍历中');
});

  */
  const effcetsToRun = new Set(effects);  //新增
  effcetsToRun.forEach(effectfn=>effectfn())
}
function track<T>(target: T, key: keyof T) {
  //没有activeEffect 直接return
  if (!activeEffect) return;
  //根据target从桶中获取depsMap
  let depsMap = bucket.get(target);
  //如果不存在，则需要新建一个Map与target关联
  if (!depsMap) bucket.set(target, (depsMap = new Map()));
  //再根据key从depsMap中取得deps  deps为set类型，存储副作用函数
  let effects = depsMap.get(key);
  //如果不存在，则需要新建一个Set与key关联
  if (!effects) depsMap.set(key, (effects = new Set()));
  //将副作用函数添加到Set中
  effects.add(activeEffect);
  //effects就是一个与当前副作用函数存在联系的依赖集合
  //将依赖集合添加到当前执行的副作用函数中
  activeEffect.deps.push(effects);
}

effect(() => {
  //data.ok为true时有可能会读取data.text的值从而把副作用函数关联到data.text
  //此时当data.text改变时，即使ok为false，也会执行副作用函数，但是ok为false时,无论data.text如何改变，title永远都是not
  //这仍然会导致副作用函数重新执行，即使 document.body.title的值不需要变化
  text = obj.ok ? obj.text : 'not';
});
effect(() => {
  console.log(obj.ok);
});
