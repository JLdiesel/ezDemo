function patchElement(n1, n2) {
  const el = n2.el = n1.el
  const oldProps = n1.props
  const newProps = n2.props
  // 第一步：更新 props
  for (const key in newProps) {
    if (newProps[key] !== oldProps[key]) {
      patchProps(el, key, oldProps[key], newProps[key])
    }
  }
  for (const key in oldProps) {
    if (!(key in newProps)) {
      patchProps(el, key, oldProps[key], null)
    }
  } // 第二步：更新 children
  patchChildren(n1, n2, el)
}
/* 
n1 为老节点
n2 为新节点
*/
function patchChildren(n1, n2, container) {
  // 判断新子节点的类型是否是文本节点
  if (typeof n2.children === 'string') {
    // 旧子节点的类型有三种可能：没有子节点、文本子节点以及一组子节点
    // 只有当旧子节点为一组子节点时，才需要逐个卸载，其他情况下什么都不需要做
    if (Array.isArray(n1.children)) {
      n1.children.forEach((c) => unmount(c))
    }
    // 最后将新的文本节点内容设置给容器元素
    setElementText(container, n2.children)
  } else if (Array.isArray(n2.children)) {
    // 说明新子节点是一组子节点
    // 判断旧子节点是否也是一组子节点
    if (Array.isArray(n1.children)) {
      // 代码运行到这里，则说明新旧子节点都是一组子节点，这里涉及核心的Diff 算法
      // 将旧的一组子节点全部卸载
      n1.children.forEach(c => unmount(c))
      // 再将新的一组子节点全部挂载到容器中
      n2.children.forEach(c => patch(null, c, container))
    } else {
      // 此时：
      // 旧子节点要么是文本子节点，要么不存在
      // 但无论哪种情况，我们都只需要将容器清空，然后将新的一组子节点逐个挂载
      setElementText(container, '')
      n2.children.forEach(c => patch(null, c, container))
    }
  } else {
    // 代码运行到这里，说明新子节点不存在
    // 旧子节点是一组子节点，只需逐个卸载即可
    if (Array.isArray(n1.children)) {
      n1.children.forEach(c => unmount(c))
    } else if (typeof n1.children === 'string') {
      // 旧子节点是文本子节点，清空内容即可
      setElementText(container, '')
    }
    // 如果也没有旧子节点，那么什么都不需要做
  }
}
const TEXT = Symbol()
const Fragment = Symbol()
function patch(n1, n2, container) {
  if (n1 && n1.type !== n2.type) {
    unmount(n1)
    n1 = null
  }

  const { type } = n2

  if (typeof type === 'string') {
    if (!n1) {
      mountElement(n2, container)
    } else {
      patchElement(n1, n2)
    }
  } else if (type === TEXT) { // 如果新 vnode 的类型是 Text，则说明该 vnode 描述的是文本节点
    // 如果没有旧节点，则进行挂载
    if (!n1) {
      // 使用 createTextNode 创建文本节点
      const el = n2.el = document.createTextNode(n2.children)
      // 将文本节点插入到容器中
      insert(el, container)
    } else {
      // 如果旧 vnode 存在，只需要使用新文本节点的文本内容更新旧文本节点即可
      const el = n2.el = n1.el
      if (n2.children !== n1.children) {
        el.nodeValue = n2.children
      }
    }
  } else if (type === Fragment) { // 处理 Fragment 类型的 vnode
    if (!n1) {
      // 如果旧 vnode 不存在，则只需要将 Fragment 的 children 逐个挂载即可
      n2.children.forEach(c => patch(null, c, container))
    } else {
      // 如果旧 vnode 存在，则只需要更新 Fragment 的 children 即可
      patchChildren(n1, n2, container)
    }
  }

}