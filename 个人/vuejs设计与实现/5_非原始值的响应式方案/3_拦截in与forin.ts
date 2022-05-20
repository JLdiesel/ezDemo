/* 
in 方法  key in obj 判断对象或原型上是否存在给定的key
通过一个hasProperty的抽象
proxy中对应的为has拦截函数
*/
const obj = {
  foo: 1,
}
enum ITERATE_TYPE{
  SET = 'SET',
  ADD = 'ADD',
  DEL='DELETE'
}

//如果没有自定义iterator，那会自动把此函数赋值给iterator，
function* EnumerateObjectProperties(obj) {
  //防止循环引用
  const visited = new Set();
  //关键点在于使用Reflect.ownKeys获取对象本身的key，所以可以通过proxy中的ownKeys来拦截该动作
  //最后达成收集依赖的目的
  for (const key of Reflect.ownKeys(obj)) {
    if (typeof key === 'symbol') continue;
    const desc = Reflect.getOwnPropertyDescriptor(obj, key);
    if (desc) {
      visited.add(key);
      if (desc.enumerable) yield key;
    }
  }
  const proto = Reflect.getPrototypeOf(obj);
  if (proto === null) return;
  for (const protoKey of EnumerateObjectProperties(proto)) {
    if (!visited.has(protoKey)) yield protoKey;
  }
}

const ITERATE_KEY = Symbol()

const proxy = new Proxy(obj, {
  has<T>(target: T, key: keyof T) {
    return Reflect.has(target as unknown as object, key)
  },
  ownKeys(target) {
    track(target, ITERATE_KEY)
    return Reflect.ownKeys(target)
  },
  deleteProperty<T>(target: T, key: keyof T) {
    //检查被操作的属性是否是对象自己的属性
    const hadKey = Object.prototype.hasOwnProperty.call(target, key)
    //使用Reflect.deleteProperty 删除属性
    const res = Reflect.deleteProperty(target as unknown as object, key) 
    if (res&& hadKey) {
      trigger(target,key,ITERATE_TYPE.DEL)
    }
    // track(target, key);
    return  res
  },
  set<T>(target: T, key: keyof T, newVal: T[keyof T], receiver) {
    //如果属性不存在，说明是在添加新属性，否则是设置已有的属性
    const type: ITERATE_TYPE = Object.prototype.hasOwnProperty.call(target, key) ? ITERATE_TYPE.SET : ITERATE_TYPE.ADD;
    //设置属性值
    const res = Reflect.set(target as unknown as object, key, newVal, receiver)
    //将type作为第三个参数传递给trigger函数
    trigger(target, key, type);
    return res;
  },
});
function trigger(target, key, type?: ITERATE_TYPE) {
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
  if (type === ITERATE_TYPE.ADD||type===ITERATE_TYPE.DEL) {
    //获取与ITERATE_KEY相关的副作用函数
    const iterateEffects = depsMap.get(ITERATE_KEY)
    //将与ITERATE_KEY相关联的副作用函数也添加到effectsToRun
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn)
      }
    })
  }

  //执行副作用函数
  effectsToRun.forEach(effectFn => {
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}
console.log('foo' in proxy);  //true
effect(() => {
  //当添加新的属性值的时候，需要触发对应的副作用函数
  //当修改新的属性值时，需要触发对应的副作用函数
  for (const key in proxy) {
    console.log(key);
  }
})
