interface effectFnOptions {
    scheduler?: (fn: effectFn) => void;
    lazy?:boolean
  }
const data = { foo: 1, bar: 2 }
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
interface effectFn {
  (): unknown;
  deps: Set<() => void>[];
  options?: effectFnOptions;
}
const effectStack = [];
let activeEffect: effectFn | null;
const bucket = new WeakMap<
  {},
  Map<string | number | symbol, Set<effectFn>>
  >();
// const getterFn = effect(() => obj.foo + obj.bar, {
//   lazy:true
// })

function effect(fn: () => void,options:effectFnOptions={}) {
  const effectFn:effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    //在调用副作用函数之前把当前副作用函数压入栈中
    effectStack.push(effectFn)
    //将fn的执行结果存储到res中 并返回
     const res= fn();
    //在当前副作用函数执行完毕后，把当前副作用函数出栈，并把activeEffect还原为之前的值
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1];
    return res
  };
  effectFn.options=options //将options挂载到effectFn上
  effectFn.deps = new Array<Set<() => void>>();
  //如果不是lazy，则直接执行
  if (!options.lazy) {
    effectFn()
  }
  //如果是lazy的，则返回副作用函数
  return effectFn;
}
function track<T>(target: T, key) {
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
function trigger<Target>(target:Target,key:keyof Target) {
  const depsMap = bucket.get(target)
  if (!depsMap) return;
  const effects = depsMap.get(key);
  const effectsToRun = new Set<effectFn>();
  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })
  effectsToRun.forEach(effectFn => {
    if (effectFn.options.scheduler) {
      console.log(effectFn);
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}
function computed(getter) {
  let value; //用来缓存上一次的值
  let dirty=true //标指是否需要重新计算值，为true则意味着脏数据，需要重新计算
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      if (!dirty) {
        //当obj.foo或者obj.bar的值发生变化的时候，把dirty重新设置为true
        dirty = true
        //当计算属性依赖的响应式数据变化时，手动调用trigger函数触发响应
        trigger(obj,'value')
      }  
    }
  })
  const obj = {
    get value() {
      //如果dirty，则重新计算，并赋值为false
      //在第一次执行computed的时候就直接会把dirty设置为false，后面就不会继续更改了
      if (dirty) {
        value = effectFn()
        dirty=false
      }
      //当读取value时，手动调用track函数追踪
      track(obj,'value')
      //没办法做到缓存，如果多次访问res.value，则会导致effectFn多次计算，即使ojb.foo和obj.bar的值本身并没有变化  解决：value缓存
      return value
    }
  }
  return obj
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
const res = computed(() => obj.foo + obj.bar)
effect(() => {
  //如果在另一个副作用函数中读取res.value
console.log(res.value);
})
obj.foo++
export { effect, track, trigger, computed, bucket, activeEffect, effectStack };