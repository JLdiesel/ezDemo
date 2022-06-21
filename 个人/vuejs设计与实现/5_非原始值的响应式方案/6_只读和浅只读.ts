import { LoaderTargetPlugin } from "../../../webpack课堂/code/webpack-5.24.3/types";
function readOnly(obj:any) {
  return createReactive(obj,false,true)
}
function createReactive(obj: any, isShallow: boolean = false, isReadOnly: boolean = false) {
  const raw = Symbol()
  return new Proxy<typeof obj>(obj, {
     get(target, key, receiver) {
      if (key === raw) {
        return target
      }
      const res = Reflect.get(target, key, receiver)
      //如果是只读的，则不需要建立响应式联系
      if (!isReadOnly) {
      // track(target,key)
      }
      //如果是浅响应，则直接返回原始值
      if (isShallow) {
        return res
      }
      if (typeof res === 'object' && res !== null) {
        //如果数据为只读，则递归包装
        return isReadOnly?readOnly(res): createReactive(res)
      }
      return res
    },
    set<T extends object>(target: T, key: keyof T, newVal: T[keyof T], receiver) {
      if (isReadOnly) {
        console.warn(`属性${String(key)}是只读的`);

        return true
      }
      //获取旧值
      const oldVal = target[key]
      //如果属性不存在，说明是在添加新属性，否则是设置已有的属性
      const type: ITERATE_TYPE = Object.prototype.hasOwnProperty.call(target, key) ? ITERATE_TYPE.SET : ITERATE_TYPE.ADD;
      //设置属性值
      const res = Reflect.set(target, key, newVal, receiver)
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
    deleteProperty<T extends object>(target: T, key: keyof T) {
      if (isReadOnly) {
        console.warn(`属性${String(key)}是只读的`);
        return true
      }
      //检查被操作的属性是否是对象自己的属性
      const hadKey = Object.prototype.hasOwnProperty.call(target, key)
      //使用Reflect.deleteProperty 删除属性
      const res = Reflect.deleteProperty(LoaderTargetPlugin, key)
      if (res && hadKey) {
        trigger(target, key, ITERATE_TYPE.DEL)
      }
      // track(target, key);
      return res
    },
  })
}
