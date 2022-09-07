import { patchProp } from "@test/runtime-dom/src/patchProp"
import { isString, ShapeFlags } from "@vue/shared"
import { createVnode, Fragment, isSameVnode, Text } from "./vnode"

export function createRenderer(options) {
  const {
    //插入
    insert: hostInsert,
    //删除
    remove: hostRemove,
    //新建
    createElement: hostCreateElement,
    createText: hostCreateText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    querySelector: hostQuerySelector,
    setScopeId: hostSetScopeId,
    cloneNode: hostCloneNode,
    patchProp: hostPatchProp
  } = options
  const normalize = (child) => {
    if (isString(child)) {
      return createVnode(Text, null, child)
    }
    return child
  }
  const mountChildren = (container, children) => {
    for (let i = 0; i < children.length; i++) {
      const child = normalize(children[i])
      patch(null, child, container)
    }
  }
  const mountElement = (vnode, container) => {
    let { type, props, children, shapeFlag } = vnode
    const el = vnode.el = hostCreateElement(type)
    if (props) {
      for (const key in props) {
        hostPatchProp(el, key, null, props[key])
      }
    }
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      hostSetElementText(el, children)
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(el, children)
    }
    hostInsert(el, container)
  }
  const processText = (n1, n2, container) => {
    if (n1 === null) {
      hostInsert(n2.el = hostCreateText(n2.children), container)
    } else {
      //文本的内容变化了，复用老的节点
      const el = n2.el = n1.el
      if (n1.children !== n2.children) {
        hostSetElementText(el, n2.children)
      }
    }
  }
  const processFragment = (n1, n2, container) => {
    let { props, children, shapeFlag } = n2
    const el = n2.el = container
    if (props) {
      for (const key in props) {
        hostPatchProp(el, key, null, props[key])
      }
    }
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      hostSetElementText(el, children)
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(el, children)
    }
  }
  const patchProps = (oldProps, newProps, el) => {
    for (const key in newProps) { //新的里面有老的没有
      hostPatchProp(el, key, oldProps[key], newProps[key])
    }
    for (const key in oldProps) {
      if (newProps[key] === null) { //老的有新的没有
        hostPatchProp(el, key, oldProps[key], null)
      }
    }
  }
  const patchChildren = (n1, n2, el) => {
    //比较两个虚拟节点的儿子的差异  el就是当前的父节点
  }
  const patchElement = (n1, n2) => { //先复用节点、再比较属性、再比较儿子
    const el = n2.el = n1.el
    const oldProps = n1.props || {}
    const newProps = n2.props || {}
    patchProps(oldProps, newProps, el);
    patchChildren(n1, n2, el);
  }
  const processElement = (n1, n2, container) => {
    if (n1 === null) {
      mountElement(n2, container)
    } else {
      //元素比对
      patchElement(n1, n2)
    }
  }
  /* 
  如果前后完全没关系，删除老的添加新的
  老的和新的一样 复用。属性可能不一样，再比对、更新属性
  比儿子
  */
  const unmount = (vnode) => {
    hostRemove(vnode.el)
  }
  const patch = (n1, n2, container) => {
    // n2 可能是个文本
    if (n1 === n2) return
    if (n1 && !isSameVnode(n1, n2)) {
      //不是同一个节点
      unmount(n1);  //删除老的
      n1 = null
    }
    const { type, shapeFlag } = n2

    switch (type) {
      case Text:
        processText(n1, n2, container)
        break;
      case Fragment:
        processFragment(n1, n2, container);
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container)
        }
        break;
    }
    // if (n1 === null) {
    //   //初次渲染
    //   mountElement(n2, container)
    // } else {
    //   //更新流程
    // }
  }
  const render = (vnode, container) => {
    //如果当前vnode=null 
    if (vnode === null) {
      //卸载逻辑
    } else {
      //初始化和更新
      patch(container._vnode || null, vnode, container)
    }
    container._vnode = vnode
  }
  return {
    render
  }
}