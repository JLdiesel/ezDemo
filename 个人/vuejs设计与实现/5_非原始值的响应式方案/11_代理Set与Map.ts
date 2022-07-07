/* 
Set.prototype.size是一个访问器属性，他的set是undefined，get执行后会读取this上的内部槽[[SetData]]
代理对象上不存在内部槽，所以会抛出错误
*/
const s = new Set([1, 2, 3]);
const p = new Proxy(s, {
  get(target, key, receiver) {
    if (key === 'size') {
      //如果读取的是size，则通过指定第三个函数receiver为原始对象target
      return Reflect.get(target, key, target);
    }
    //p.delete会永远指向p,所以需要把delete方法与原始数据对象绑定
    return target[key].bind(target);
  }
});
