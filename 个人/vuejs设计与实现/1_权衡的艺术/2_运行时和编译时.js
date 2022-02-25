/*
 * @Author: your name
 * @Date: 2022-02-25 15:28:41
 * @LastEditTime: 2022-02-25 15:39:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web\学习代码\个人\vuejs设计与实现\2_运行时和编译时.js
 */
const obj = {
  tag: 'div',
  children: [{ tag: 'div', children: 'hello world' }],
};
//纯运行时  直接提供 树型结构的数据对象
function Render(obj, root) {
  const el = document.createElement(obj.tagName);
  if (typeof obj.children === 'string') {
    const textNode = document.createTextNode(obj.children);
    el.appendChild(textNode);
  } else if (obj.children) {
    obj.children.forEach((item) => render(item, el));
  }
  root.appendChild(el);
}
render(obj, document.body);
//运行时+编译时
//把用户写的html编译成树型结构的数据对象 然后用render来渲染
/* 
const html=<div><span>hello jl</span></div>
const obj=compiler(html);
render(obj)
*/
//纯编译时
//const html=<div><span>hello jl</span></div> 直接编译成原生js代码
const div = document.createElement('div');
const span = document.createElement('span');
span.innerText = 'hello jl';
div.appendChild(span);
document.body.appendChild(div);
