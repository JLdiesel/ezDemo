/*
 * @Author: your name
 * @Date: 2022-02-25 15:05:38
 * @LastEditTime: 2022-02-25 15:21:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web\学习代码\个人\vuejs设计与实现\1_原生_vdom_innerHtml的区别.js
 */
//命令式  可维护型差  性能高   心智负担大(写起来恶心)
const div = document.querySelector('#app');
div.innerText = 'helloworld';
div.addEventListener('click', () => {
  console.log(123);
});

// 声明式 更新性能消耗=找出差异的性能消耗+直接修改的性能消耗 可维护型好  性能不错   心智负担小(写起来舒服)
//vdom   为了最小化找出差异这一步的性能消耗  可维护型强

//innerHTML 创建页面的消耗=html字符串拼接的计算量+innerHTML的DOM计算量
// 比较vdom，在创建时两者差距不大，innerHTML甚至可能性能更高
//  在更新时 innerHTML会直接销毁之前的dom，重新执行创建页面 ，全量更新
//   vdom却可以通过虚拟dom Diff来找到需要更新的元素,并单独更新它，不需要重新执行创建页面 只更新必要的元素
