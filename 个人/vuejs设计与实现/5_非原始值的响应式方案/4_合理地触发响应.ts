function reactive(obj) {
  const raw = Symbol();
  return new Proxy(obj, {
    get(target, key, source) {
      //在get方法中添加 key=raw时返回源对象
      if (key === raw) {
        return target;
      }
      track(target, key);
      return Reflect.get(target, key, source);
    },
    set<T>(target: T, key: keyof T, newVal: T[keyof T], receiver) {
      //获取旧值
      const oldVal = target[key];
      //如果属性不存在，说明是在添加新属性，否则是设置已有的属性
      const type: ITERATE_TYPE = Object.prototype.hasOwnProperty.call(
        target,
        key
      )
        ? ITERATE_TYPE.SET
        : ITERATE_TYPE.ADD;
      //设置属性值
      const res = Reflect.set(
        target as unknown as object,
        key,
        newVal,
        receiver
      );
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
    }
  });
}
const obj = {};
const proto = { bar: 1 };
const child = reactive(obj);
const parent = reactive(proto);
//使用parent作为child的原型
Object.setPrototypeOf(child, parent);
effect(() => {
  //打印bar，会先执行child的get操作，添加函数依赖，然后执行parent的get操作，也会把依赖添加到parent上
  console.log(child.bar); //1
});
//修改child.bar的值
//会执行child的set方法，触发副作用函数，但找不到bar会去原型链上找，执行parent的set方法，又触发副作用函数
child.bar = 2; //会导致副作用函数重新执行两次
export { reactive };
