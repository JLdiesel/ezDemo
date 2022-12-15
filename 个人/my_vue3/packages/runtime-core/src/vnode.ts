//type props children

import { isArray, isObject, isString, ShapeFlags } from '@vue/shared';
export const Text = Symbol('Text');
export const Fragment = Symbol('Fragment');
export function isSameVnode(n1, n2) {
  //判断两个虚拟节点是否相同  1、标签名相同 2、key是一样的
  return n1.type === n2.type && n1.key === n2.key;
}
//组件,元素,文本
export function createVnode(
  type,
  props,
  children: any[] | null | string = null
) {
  //组合方案  我想只要一个元素中包含的是多个儿子还是一个儿子
  let shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : isObject(type)
      ? ShapeFlags.STATEFUL_COMPONENT
      : 0;
  // 虚拟dom就是一个对象 diff算法，真实dom的属性比较多
  const vnode = {
    type,
    props,
    children,
    key: props?.key,
    el: null, //真实dom
    __v_isVnode: true,
    shapeFlag,
    component: null
  };
  if (children) {
    let type = 0;
    if (isArray(children)) {
      type = ShapeFlags.ARRAY_CHILDREN;
    } else {
      document.createTextNode(String(children));
      type = ShapeFlags.TEXT_CHILDREN;
    }
    vnode.shapeFlag |= type;
  }

  return vnode;
}
export type Vnode = ReturnType<typeof createVnode>