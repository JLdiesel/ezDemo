/*
容器的内容可能是由某个或多个组件渲染的，当卸载操作发生时，应该正确地调用这些组件的 beforeUnmount、unmounted等生命周期函数。

即使内容不是由组件渲染的，有的元素存在自定义指令，我们应该在卸载操作发生时正确执行对应的指令钩子函数。

使用 innerHTML 清空容器元素内容的另一个缺陷是，它不会移除绑定在 DOM 元素上的事件处理函数

正确方法：
根据 vnode 对象获取与其相关联的真实DOM 元素，然后使用原生 DOM 操作方法将该 DOM 元素移除 */

function mountElement(vnode, container) {
  //调用 createElement 函数创建真实 DOM 元素时，会把真实 DOM 元素赋值给 vnode.el 属性
  const el = vnode.el = createElement(vnode.type)
  if (typeof vnode.children === 'string') {
    setElementText(el, vnode.children)
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => {
      patch(null, child, el)
    })
  }

  if (vnode.props) {
    for (const key in vnode.props) {
      patchProps(el, key, null, vnode.props[key])
    }
  }

  insert(el, container)
}
function patch(n1, n2, container) {
  // 如果 n1 存在，则对比 n1 和 n2 的类型
  if (n1 && n1.type !== n2.type) {
    // 如果新旧 vnode 的类型不同，则直接将旧 vnode 卸载
    unmount(n1)
    n1 = null
  }
  // 代码运行到这里，证明 n1 和 n2 所描述的内容相同
  const { type } = n2
  // 如果 n2.type 的值是字符串类型，则它描述的是普通标签元素
  if (typeof type === 'string') {
    if (!n1) {
      mountElement(n2, container)
    } else {
      patchElement(n1, n2)
    }
  } else if (typeof type === 'object') {
    // 如果 n2.type 的值的类型是对象，则它描述的是组件
  } else if (type === 'xxx') {
    // 处理其他类型的 vnode
  }

}

function render(vnode, container) {
  if (vnode) {
    patch(container._vnode, vnode, container)
  } else {
    if (container._vnode) {
      // 根据 vnode 获取要卸载的真实 DOM 元素
      unmount(container._vnode)

    }
  }
  container._vnode = vnode
}
function unmount(vnode) {
  // 获取 el 的父元素
  const parent = vnode.el.parentNode
  if (parent) {
    // 调用 removeChild 移除元素
    parent.removeChild(vnode.el)
  }
}
