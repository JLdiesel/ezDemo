const obj = {
  foo: 1,
  get bar() {
    //原始方法this指向obj，Reflect后this指向代理对象
    return this.foo
  }
}
console.log(Reflect.get(obj,'foo',{foo:2})); //2
/* 
receiver相当于函数调用过程中的this,
*/
effect(() => {
  //该句访问了obj.bar，又通过bar访问了foo,
  console.log(obj.bar);
})
const proxy = new Proxy(obj, {
  get<T>(target: T, key: keyof T,receiver) {
    track(target, key);
    return Reflect.get(target as unknown as object,key,receiver) //receiver为proxy，此时访问的foo为proxy代理数据的foo，可以触发proxy的拦截
    return target[key]; //如果通过target[key]这种方式访问，访问的是obj（源数据）的foo，proxy不能拦截并收集依赖
  },
});
export{}