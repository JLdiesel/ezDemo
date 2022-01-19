/*“一个对象，该对象所有的以及继承的属性，都会从关联对象的 with 环境绑定中排除” 
设置这个符号并让其映射对应属性的键值为 true，就可以阻止该属性出现在 with 环境绑定中
 */
let o = { foo: 'bar' };
with (o) {
  console.log(foo); // bar
}
o[Symbol.unscopables] = {
  foo: true,
};
with (o) {
  console.log(foo); // ReferenceError
}
