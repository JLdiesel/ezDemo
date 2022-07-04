import { track, trigger } from './effect';
export enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive'
}
export const mutableHandler = {
  /**
   * @param target 原对象，被代理对象
   * @param key 原对象的key
   * @param receiver 代理对象
   */
  get<T extends object>(target: T, key: keyof T, receiver: any) {
    //调用
    if (key === ReactiveFlags.IS_REACTIVE) return true;
    console.log(key); //用Reflect会把this改成代理对象 取target.age的时候会先读取target.age,再读取target.name
    track(target, 'get', key);
    return Reflect.get(target, key, receiver);
  },
  /**
   * @param value 新赋值的value
   */
  set<T extends object>(
    target: T,
    key: keyof T,
    value: T[keyof T],
    receiver: any
  ) {
    let oldValue = target[key];
    let result = Reflect.set(target, key, value, receiver);
    if (oldValue != value) {
      //值变化了 要更新
      trigger(target, 'set', key, value, oldValue);
    }
    return Reflect.set(target, key, value, receiver);
  }
};
