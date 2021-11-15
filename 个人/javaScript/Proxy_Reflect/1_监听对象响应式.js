const obj = {
  name: 'jl',
  age:18
}
Object.defineProperty(obj, 'name', {
  get: function(){
    console.log('监听访问');
    return 123
  },
  set: function () {
    console.log('监听设置');
  }
})
console.log(obj.name);
obj.name='bb'