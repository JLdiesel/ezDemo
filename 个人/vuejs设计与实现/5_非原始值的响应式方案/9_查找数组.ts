const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive', RAW = '__v_raw'
}
// 通过一个weakMap来存储源对象与Proxy的关系
const reactiveMap = new WeakMap();
const arrayInstrumentations = {
}
  //初始化arrayInstrumentations，重写三个方法
  ;['includes', 'indexOf', 'lastIndexOf'].forEach(method => {
    const originMethod = Array.prototype[method];
    arrayInstrumentations[method] = function (...args) {
      //this是代理对象，先在代理对象中查找，将结果存储到res中
      let res = originMethod.apply(this, args)
      if (res === false) {
        //res为false说明没找到，通过this.raw拿到原始数组，再去其中查找并更新res值
        res = originMethod.apply(this[ReactiveFlags.RAW], args)
      }
      return res
    }
  })
const obj = {}
const arr = createReactive([obj])
function readOnly(obj: any) {
  return createReactive(obj, false, true)
}

console.log(arr[0] === arr[0]);//原先的为false 修改后为true 
console.log(arr.includes(obj));//原先的为false 修改后为true 

console.log(arr.includes(arr[0])); //如果通过现有的get方法取，取到的arr[0]为响应式对象，不等于原来的ojb，所以返回 false ，修改后返回true
function createReactive<T extends object>(obj: T, isShallow: boolean = false, isReadOnly: boolean = false): T {
  //如果源对象已经被代理了，则直接返回代理对象
  const existingProxy = reactiveMap.get(obj);
  if (existingProxy) return existingProxy
  //如果代理对象重新代理，则直接返回原代理对象避免重复代理
  if (obj[ReactiveFlags.IS_REACTIVE]) {
    return obj;
  }
  const proxy = new Proxy<T>(obj, {
    get(target, key, receiver) {
      if (key === ReactiveFlags.IS_REACTIVE) {
        return true
      }
      if (key === ReactiveFlags.RAW) {
        return target
      }
      //如果操作的目标对象是数组，并且key存在于arrayInstrumentations上
      //那么返回定义在arrayInstrumentations上的值
      //当读取includes等方法时，会执行arrayInstrumentations上的includes方法，变相重写includes方法
      if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(key)) {
        return Reflect.get(arrayInstrumentations, key, receiver)
      }
      const res = Reflect.get(target, key, receiver)
      //如果是只读并且不是symbol类型的，则不需要建立响应式联系
      if (!isReadOnly && typeof key !== 'symbol') {
        // track(target,key)
      }
      //如果是浅响应，则直接返回原始值
      if (isShallow) {
        return res
      }
      if (typeof res === 'object' && res !== null) {
        //如果数据为只读，则递归包装
        return isReadOnly ? readOnly(res) : createReactive(res)
      }
      return res
    },
  })
  reactiveMap.set(obj, proxy)
  return proxy
}
// export {}