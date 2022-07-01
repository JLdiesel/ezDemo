import { isObject } from '@vue/shared';
import { ReactiveFlags, mutableHandler } from './baseHandler';
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

export function reactive(target: any) {
  if (!isObject(target)) return;
  //如果代理对象重新代理，则直接返回原代理对象避免重复代理
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target;
  }
  //如果源对象已经被代理了，则直接返回代理对象
  const existingProxy = reactiveMap.get(target);
  if (existingProxy) return existingProxy;
  const proxy = new Proxy(target, mutableHandler);
  reactiveMap.set(target, proxy);
  return proxy;
}
const proxy = reactive(target);
console.log(proxy.age);
