/*  
shallowReactive 和 reactive 的区别
*/
enum ITERATE_TYPE{
  SET = 'SET',
  ADD = 'ADD',
  DEL='DELETE'
}
const obj=reactive({foo:{bar:1},flag:true})
function shallowReactive(obj) {  
  const raw=Symbol()
  return new Proxy(obj, {
    get(target, key, source) {
      if (key === raw) {
        return target
      }
      track(target, key);
      //当读取属性值时，直接返回结果
      return Reflect.get(target, key, source)
    },
    set<T>(target: T, key: keyof T, newVal: T[keyof T], receiver) {
      //获取旧值
      const oldVal = target[key]
      //如果属性不存在，说明是在添加新属性，否则是设置已有的属性
      const type: ITERATE_TYPE = Object.prototype.hasOwnProperty.call(target, key) ? ITERATE_TYPE.SET : ITERATE_TYPE.ADD;
      //设置属性值
      const res = Reflect.set(target as unknown as object, key, newVal, receiver)
      //只有当target===receiver[raw]时，说明receiver是target的代理对象 
      // receiver[raw]返回源对象，如果receiver不是当前target的代理对象，那么就会返回不同的源对象，就不需要执行副作用函数
      if (target === receiver[raw]) {
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          // 缺点：如果用NAN来作为新值，NAN永远!==NAN，如果之前是NAN，之后用户又设置了NAN，那么还是会触发响应式
          // 更新：只有当新值与旧值不相等并且两个都不是NAN的时候才会触发响应
          trigger(target, key, type);
        }
      }
      return res;
    },
  });
}
//我们读取obj.foo.bar的时候，读取obj.foo的值，由于通过Reflect.get方法获取到的obj.foo为一个普通对象，而不是响应式对象，所以访问obj.foo.bar不能建立响应联系
function reactive(obj) {  
  const raw=Symbol()
  return new Proxy(obj, {
    get(target, key, source) {
      if (key === raw) {
        return target
      }
      track(target, key);
      const res = Reflect.get(target, key, source)
      //如果获取到的为对象，则递归包装成响应式
      if (typeof res === 'object' && res !== null) {
        return reactive(res)
      }
      return  res
    },
  });
}
//两个合并一下，封装成一个createReactive函数
function createReactive(obj,isShallow:boolean=false) {
  const raw=Symbol()
  return new Proxy(obj, {
    get(target, key, receiver) {
      if (key === raw) {
        return target
      }
      const res = Reflect.get(target, key, receiver)
      track(target,key)
      //如果是浅响应，则直接返回原始值
      if (isShallow) {
        return res
      }
      if (typeof res === 'object' && res !== null) {
        return createReactive(res)
      }
      return res
    },
    set<T>(target: T, key: keyof T, newVal: T[keyof T], receiver) {
      //获取旧值
      const oldVal = target[key]
      //如果属性不存在，说明是在添加新属性，否则是设置已有的属性
      const type: ITERATE_TYPE = Object.prototype.hasOwnProperty.call(target, key) ? ITERATE_TYPE.SET : ITERATE_TYPE.ADD;
      //设置属性值
      const res = Reflect.set(target as unknown as object, key, newVal, receiver)
      //只有当target===receiver[raw]时，说明receiver是target的代理对象 
      // receiver[raw]返回源对象，如果receiver不是当前target的代理对象，那么就会返回不同的源对象，就不需要执行副作用函数
      if (target === receiver[raw]) {
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          // 缺点：如果用NAN来作为新值，NAN永远!==NAN，如果之前是NAN，之后用户又设置了NAN，那么还是会触发响应式
          // 更新：只有当新值与旧值不相等并且两个都不是NAN的时候才会触发响应
          trigger(target, key, type);
        }
      }
      return res;
    },
  })
}

export {}