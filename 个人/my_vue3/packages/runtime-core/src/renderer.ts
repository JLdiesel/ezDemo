import { ShapeFlags } from "@vue/shared"

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
  const mountChildren = (container, children) => {
    for (let i = 0; i < children.length; i++) {
      patch(null, children[i], container)
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
  const patch = (n1, n2, container) => {
    // n2 可能是个文本
    if (n1 === n2) return
    if (n1 === null) {
      //初次渲染
      mountElement(n2, container)
    } else {
      //更新流程
    }
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