const obj = {
  _name: 'jl',
  get name() {
    /*  没有receiver时  指向 obj对象
        有recevier时  指向objProxy对象
    */
    return this._name;
  },
  set name(newValue) {
    this._name = newValue;
  },
};
const objProxy = new Proxy(obj, {
  get(target, key, receiver) {
    //receiver 是创建出来的代理对象
    console.log('get', key, receiver);
    /* 
        get name { _name: 'lyj', name: [Getter/Setter] }
        get _name { _name: 'lyj', name: [Getter/Setter] }
    */
    //改变this指向
    return Reflect.get(target, key, receiver);
  },
  set(target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver);
  },
});
objProxy.name = 'lyj';
console.log(objProxy.name);
