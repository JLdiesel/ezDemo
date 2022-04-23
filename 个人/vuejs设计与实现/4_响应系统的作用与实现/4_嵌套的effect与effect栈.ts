/* 
effect(function effect1(){
  effect(function effect2(){
  ...
  }) 
})
effect函数是可以嵌套的
在Vue.js的render渲染函数就是在effect中执行的

*/
//Foo组件

//在一个effect中执行Foo组件的渲染函数
effect(() => {
  Foo.render()
})
//当组件发生嵌套时 effect函数就发生嵌套了
const Bar = {
  render() {
    return
  }
}
const Foo = {
  render(){
   return <Bar />
  }
}
//相当于
effect(()=>{
  Foo.render()
  //
  effect(() => {
    Bar.render()
  })
})
let temp1, temp2
const obj = {
  bar: '123',
  foo:'456'
}
//嵌套存在的问题
//合理的联系为
/* 
foo=>fn1;
bar=>fn2
但是当修改obj.foo时,foo对应的函数却是fn2，这是因为我们使用一个全局变量  activeEffect来存放当前执行的函数
当fn1执行时，会执行fn2，此时activeEffect会从fn1变为fn2，当fn2执行完后，执行fn1之后的代码时，activeEffect依旧是fn2，所以之后的代码依赖会出现错误
*/

effect(() => {
  console.log('fn1执行');
  effect(() => {
    console.log('fn2执行');
    temp1=obj.bar
  })
  temp2=obj.foo
})
export{}