const obj = {
  foo: 1,
  get bar() {
    //原始方法this指向obj，Reflect后this指向代理对象
    return this.foo
  }
}

const proxy = new Proxy(obj, {
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
});
delete proxy.foo
console.log(obj);  /* 
{ bar: [Getter] }
{ bar: [Getter] } */
console.log(proxy);
//两处同时删除了foo

export{}