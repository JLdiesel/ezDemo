/*
 * @Author: your name
 * @Date: 2022-02-28 15:33:27
 * @LastEditTime: 2022-02-28 15:51:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web\学习代码\个人\vuejs设计与实现\3_Vue3的设计思路\1_声明式描述UI以及渲染函数.js
 */
/*  声明式描述UI(h函数/JS对象)
render(){
    return h('h1',{onClick:handler})
}
render(){
    return{ 
        tag:'h1',props:{onClick:handler}
    }
}
*/
/* 
渲染函数 renderer
*/
function mountElement(
  vnode: { tag: any; props: { [x: string]: any }; children: string | any[] },
  container: { appendChild: (arg0: any) => void }
) {
  //创建dom元素
  const el = document.createElement(vnode.tag);

  //遍历vnode.props 将属性事件添加到dom元素
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key];
      if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        el.setAttribute(key, value);
      }
    }
  }

  //处理子节点
  if (vnode.children) {
    if (typeof vnode.children === 'string') {
      el.appendChild(document.createTextNode(vnode.children));
    } else {
      vnode.children.forEach((child: any) => {
        mountElement(child, el);
      });
    }
  }
  if (container) {
    container.appendChild(el);
  } else {
    return el;
  }
}
function mountComponent(vnode: { tag: () => any }, container: any) {
  const subtree = vnode.tag();
  renderer(subtree, container);
}
function mountObject(vnode: { tag: { render: () => any } }, container: any) {
  const subtree = vnode.tag.render();
  renderer(subtree, container);
}
function renderer(
  vnode: { tag: any; props: { [x: string]: any }; children: string | any[] },
  container: any
) {
  if (typeof vnode.tag === 'string') {
    mountElement(vnode, container);
  } else if (typeof vnode.tag === 'function') {
    mountComponent(vnode, container);
  } else if (typeof vnode.tag === 'object') {
    mountObject(vnode, container);
  }
}
