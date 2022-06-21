interface effectFnOptions {
  scheduler?: (fn: effectFn) => void;
  lazy?: boolean
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

function createReactive(obj: any, isShallow: boolean = false, isReadOnly: boolean = false) {
  const raw = Symbol()
  return new Proxy<typeof obj>(obj, {
 
    set<T extends object>(target: T, key: keyof T, newVal: T[keyof T], receiver) {
      if (isReadOnly) {
        console.warn(`属性${String(key)}是只读的`);
        return true
      }
      //获取旧值
      const oldVal = target[key]
      //const arr =[0]   arr[1]=1 此时会触发set操作，并隐式修改arr.length  
      //如果原目标是一个数组，那么看看Key的下标是否超越了数组下标，如果是的话，则证明是添加操作，如果不是，则证明是设置操作。
      const type: ITERATE_TYPE = Array.isArray(target) ? Number(key) < target.length ? ITERATE_TYPE.SET : ITERATE_TYPE.ADD :
        //如果属性不存在，说明是在添加新属性，否则是设置已有的属性
        Object.prototype.hasOwnProperty.call(target, key) ? ITERATE_TYPE.SET : ITERATE_TYPE.ADD;
      //设置属性值
      const res = Reflect.set(target, key, newVal, receiver)
      //只有当target===receiver[raw]时，说明receiver是target的代理对象 
      // receiver[raw]返回源对象，如果receiver不是当前target的代理对象，那么就会返回不同的源对象，就不需要执行副作用函数
      if (target === receiver[raw]) {
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          // 缺点：如果用NAN来作为新值，NAN永远!==NAN，如果之前是NAN，之后用户又设置了NAN，那么还是会触发响应式
          // 更新：只有当新值与旧值不相等并且两个都不是NAN的时候才会触发响应
          trigger(target, key, type, newVal);
        }
      }
      return res;
    },
  })
}
function trigger<T>(target: T, key: keyof T, type?: ITERATE_TYPE, newVal?: T[keyof T]) {
  const depsMap = bucket.get(target)
  if (!depsMap) return;
  //获取与key相关联的副作用函数
  const effects = depsMap.get(key);

  const effectsToRun = new Set<effectFn>();
  //将与key相关联的副作用函数添加到effectsToRun
  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })
  //只有当操作类型为ADD或DEL时，才触发与ITERATE_KEY相关联的副作用函数重新执行
  if (type === ITERATE_TYPE.ADD || type === ITERATE_TYPE.DEL) {
    runEffect(depsMap, ITERATE_KEY)
  }
  //取出并执行与length属性相关的副作用函数
  if (type === ITERATE_TYPE.ADD && Array.isArray(target)) {
    runEffect(depsMap, 'length')
  }
  //如果操作目标是数组并且修改了length值
  if (Array.isArray(target) && key === 'length') {
    //取出所有索引大于新length的元素的副作用函数并添加到effectsToRun等待执行
    depsMap.forEach((effects, key) => {
      if (Number(key) >= Number(newVal!)) {
        effects && effects.forEach(effectFn => {
          if (effectFn !== activeEffect) {
            effectsToRun.add(effectFn)
          }
        })
      }
    })
  }
  function runEffect(depsMap, key) {
    //获取与key相关的副作用函数
    const iterateEffects = depsMap.get(key)
    //将与key相关联的副作用函数也添加到effectsToRun
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn)
      }
    })
  }
  //执行副作用函数
  effectsToRun.forEach(effectFn => {
    if (effectFn.options?.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}