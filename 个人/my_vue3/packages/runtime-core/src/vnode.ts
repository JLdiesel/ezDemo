//type props children

import { isArray, isString, ShapeFlags } from "@vue/shared";

//组件,元素,文本
export function createVnode(type, props, children: any[] | null | string = null) {
  //组合方案  我想只要一个元素中包含的是多个儿子还是一个儿子
  let shapeFlag = isString(type) ? ShapeFlags.ELEMENT : 0
  // 虚拟dom就是一个对象 diff算法，真实dom的属性比较多
  const vnode = {
    type,
    props,
    children,
    key: props?.key,
    el: null,//真实dom
    __v_isVnode: true,
    shapeFlag
  }
  if (children) {
    let type = 0
    if (isArray(children)) {
      type = ShapeFlags.ARRAY_CHILDREN
    } else {
      document.createTextNode(String(children))
      type = ShapeFlags.TEXT_CHILDREN
    }
    vnode.shapeFlag |= type
  }

  return vnode
}