import { isString, ShapeFlags } from "@vue/shared"
import { getSequence } from "./sequence"
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
  const normalize = (child, i) => {
    if (isString(child[i])) {
      child[i] = createVnode(Text, null, child[i])
    }
    return child[i]
  }
  const mountChildren = (container, children) => {
    for (let i = 0; i < children.length; i++) {
      const child = normalize(children, i) //处理后要进行替换 否则children中依旧存储字符串
      patch(null, child, container)
    }
  }
  const mountElement = (vnode, container, anchor) => {
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
    hostInsert(el, container, anchor)
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
  const processFragment = (n1, n2, container, anchor) => {
    if (n1 == null) {
      mountChildren(container, n2.children)
    } else {
      patchChildren(n1, n2, container)
    }

  }
  const patchProps = (oldProps, newProps, el) => {
    for (const key in newProps) { //新的里面有老的没有
      hostPatchProp(el, key, oldProps[key], newProps[key])
    }
    for (const key in oldProps) {
      if (!newProps[key]) { //老的有新的没有
        hostPatchProp(el, key, oldProps[key], null)
      }
    }
  }
  const patchKeyChildren = (c1, c2, el) => {
    let i = 0
    let e1 = c1.length - 1
    let e2 = c2.length - 1
    /* 
    [1,2,3,4]  [1,2,5,3,4] i=2  e1=1 e2=2
    [1,2]  [1,2,3] i=2 e1=1 e2=2
    [1,2]  [3,1,2] i=0 e1=-1 e2=0
    [1,2]  [4,3,1,2] i=0 e1=-1 e2=1
    [1,2,3] [1,2] i=2 e1=2 e2=1
    [1,2,3,5,6] [1,2,4,5,6] i=2 e1=2 e2=2
    */
    //sync from start 
    while (i <= e1 && i <= e2) { //从头部开始比 如果有一个不相同了则跳出
      const n1 = c1[i]
      const n2 = c2[i]
      if (isSameVnode(n1, n2)) {
        patch(n1, n2, el)
      } else {
        break
      }
      i++
    }
    // sync from end
    while (i <= e1 && i <= e2) { // 从尾部比 如果有一个不相同了则跳出
      const n1 = c1[e1]
      const n2 = c2[e2]
      if (isSameVnode(n1, n2)) {
        patch(n1, n2, el)
      } else {
        break;
      }
      e1--
      e2--
    }
    // common sequence +mount
    //i 比e1大说明有新增的 i和e2之间的是新增的部分
    if (i > e1) {
      if (i <= e2) {
        while (i <= e2) {
          const nextPos = e2 + 1
          // 根据下一个人的索引来看参照物
          const anchor = nextPos < c2.length ? c2[nextPos].el : null
          patch(null, c2[i], el, anchor) //创建新节点扔到容器中
          i++
        }
      }
    } else if (i > e2) {
      // common sequence +unmount
      // i 比e2大说明有写在的，i到e1之间的是卸载的部分
      if (i <= e1) {
        while (i <= e1) {
          unmount(c1[i])
          i++
        }
      }
    }
    //乱序比对
    let s1 = i
    let s2 = i
    const keyToNewIndexMap = new Map() //key -> newIndex
    for (let i = s2; i <= e2; i++) {
      keyToNewIndexMap.set(c2[i].key, i)
    }
    const toBePatched = e2 - s2 + 1 //新的总个数
    // 新的位置对应的老的位置 如果数组里放的值>0说明已经patch过了
    const newIndexToOldIndex = new Array(toBePatched).fill(0) //一个记录是否比对过的映射表
    // 循环老元素 看一下新的里面有没有，如果有说明要比较差异，没有要添加到列表中，老的有新的没有，要删除
    for (let i = s1; i <= e1; i++) {
      const oldChild = c1[i] //老孩子
      const newIndex = keyToNewIndexMap.get(oldChild.key)
      if (!newIndex) {
        unmount(oldChild);
      } else {
        newIndexToOldIndex[newIndex - s2] = i + 1
        patch(oldChild, c2[newIndex], el)
      }
    }
    const incrementArr = getSequence(newIndexToOldIndex)

    //需要移动位置
    let j = incrementArr.length - 1
    for (let i = toBePatched - 1; i >= 0; i--) {
      //i为要比较的内容的索引
      let index = i + s2 //真正的索引

      const current = c2[index]
      const anchor = index + 1 < c2.length ? c2[index + 1].el : null;
      if (newIndexToOldIndex[i] === 0) {
        //创建
        //当前的current是新增的，没有所谓的el
        patch(null, current, el, anchor)
      } else {
        if (i !== incrementArr[j]) {
          //不是0，说明已经patch过了
          hostInsert(current.el, el, anchor)
        } else {
          j--
        }

      }
    }

  }

  const patchChildren = (n1, n2, el) => {
    //比较两个虚拟节点的儿子的差异  el就是当前的父节点
    const c1 = n1.children
    const c2 = n2.children
    const { shapeFlag: prevShapeFlag } = n1
    const { shapeFlag } = n2
    //比较两个儿子列表的差异
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      //新的是文本
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        //老的是数组 删除所有子节点
        unmountChildren(c1)// 数组 文本
      }
      if (c1 !== c2) { //文本 文本  
        hostSetElementText(el, c2) //空 文本
      }
    } else {
      // 新的为 数组或空
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        //之前也是数组 
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          //diff 新的为数组 老的也是数组  数组 数组
          patchKeyChildren(c1, c2, el)//全量比对
        } else {
          //之前是数组 现在是空
          unmountChildren(c1)//删除以前的 数组 空
        }
      } else {
        if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
          //之前是文本
          hostSetElementText(el, '') //文本 数组
        }
        //新的是数组
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          mountChildren(c2, el) // 文本 数组  空 数组
        }
      }
    }
  }
  const unmountChildren = (children) => {
    for (let i = 0; i < children.length; i++) {
      unmount(children[i])

    }
  }
  const patchElement = (n1, n2) => { //先复用节点、再比较属性、再比较儿子
    const el = n2.el = n1.el
    const oldProps = n1.props || {}
    const newProps = n2.props || {}
    patchProps(oldProps, newProps, el);
    patchChildren(n1, n2, el);
  }
  const processElement = (n1, n2, container, anchor) => {
    if (n1 === null) {
      mountElement(n2, container, anchor)
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
  const patch = (n1, n2, container, anchor = null) => {
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
        processFragment(n1, n2, container, anchor);
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, anchor)
        }
        break;
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