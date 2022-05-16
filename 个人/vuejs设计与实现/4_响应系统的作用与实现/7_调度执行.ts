/* 

当trigger动作触发副作用函数重新执行是，有能力决定副作用函数执行的时机、次数以及方式
*/

const obj={foo:1,bar:2}
/* 
effect(() => {
  console.log(obj.foo);
  
}, {
  //调度器是一个函数
  scheduler(fn) {
  }
}) 
*/
interface effectFnOptions {
    scheduler?: (fn: effectFn) => void;
    lazy?:boolean
  }
interface effectFn {
  (): void;
  deps: Set<() => void>[];
  options?: effectFnOptions;
}
let activeEffect:effectFn | null;
const bucket = new WeakMap<
  {},
  Map<string | number | symbol, Set<effectFn>>
>();
//利用栈,在副作用函数执行时入栈，执行完毕后出栈，并始终让activeEffect指向栈顶的副作用函数
//一个响应式数据只会收集直接读取其值的副作用函数，而不会影响外层的依赖收集
effect(() => {
  //指定lazy选项，这个函数不会立即执行
  console.log(obj.foo);
}, {
  lazy:true
})
const effectStack = [];
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
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}
//把副作用函数添加到宏任务中 延迟执行
/* effect(() => {
  console.log(obj.foo);
}, {
  //调度器是一个函数
  scheduler(fn) {
    setTimeout(fn);
  }
})  */


const jobQueue = new Set<effectFn>()
const promise = Promise.resolve()//创建promise实例，用其将一个任务添加到微任务队列
let isFlushing = false;
function flushJob() {
  //如果队列正在刷新，则什么都不做
  if (isFlushing) return
  //设置为true，代表正在刷新
  isFlushing=true
  //在微任务队列中刷新jobQueue队列
  //微任务队列中拿到的就是已经收集完副作用函数的队列
  promise.then(() => {
    jobQueue.forEach(job=>job())
  }).finally(() => {
    isFlushing=false
  })
}
/* 
连续修改多次响应式数据，但只会进行一次更新
把任务添加到微任务队列中，在一次任务调度过程中，只会执行一次job()
*/
effect(() => {
  console.log(obj.foo);
}, {
  scheduler(fn) {
    jobQueue.add(fn)
    flushJob()
  }
})
export{}