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
//
export{}