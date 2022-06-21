import { isObject } from '@vue/shared';
const target = {
  name: 'jl',
  get age() {
    console.log(this); //用Reflect的receiver参数改变了取值时的this。收集了age和name的依赖
    return this.name;
  }
};
type dep = Set<() => void>;
// interface effectFn {
//   (): unknown;
//   deps: dep[];
//   options?: effectFnOptions;
// }
type WeakMapType<T extends object> = WeakMap<T, Map<keyof T, dep[]>>;
const reactiveMap = new WeakMap();
const deepMap: WeakMapType<any> = new WeakMap();
const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive'
}
export function reactive(target: any) {
  if (!isObject(target)) return;
  //如果代理对象重新代理，则直接返回原代理对象避免重复代理
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target;
  }
  //如果源对象已经被代理了，则直接返回代理对象
  const existingProxy = reactiveMap.get(target);
  if (existingProxy) return existingProxy;
  const proxy = new Proxy(target, {
    /**
     *
     * @param target 原对象，被代理对象
     * @param key 原对象的key
     * @param receiver 代理对象
     */
    get<T extends object>(target: T, key: keyof T, receiver: any) {
      //调用
      if (key === ReactiveFlags.IS_REACTIVE) return true;
      console.log(key); //用Reflect会把this改成代理对象 取target.age的时候会先读取target.age,再读取target.name
      return Reflect.get(target, key, receiver);
    },
    /**
     * @param target 原对象，被代理对象
     * @param key 原对象的key
     * @param receiver 代理对象
     * @param value 新赋值的value
     * @returns
     */
    set<T extends object>(
      target: T,
      key: keyof T,
      value: T[keyof T],
      receiver: any
    ) {
      const map = reactiveMap.get(target);
      return Reflect.set(target, key, value, receiver);
    }
  });
  reactiveMap.set(target, proxy);
  return proxy;
}
const proxy = reactive(target);
console.log(proxy.age);
