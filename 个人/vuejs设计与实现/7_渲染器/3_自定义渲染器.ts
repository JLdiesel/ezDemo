/* 
不再直接依赖于浏览器的特有 API 了。
这意味着，只要传入不同的配置项，就能够完成非浏览器环境下的渲染工作
通过抽象的手段，让核心代码不再依赖平台特有的 API，再通过支持个性化配置的能力来实现跨平台。
*/
const renderer = createRenderer({
  // 用于创建元素
  createElement(tag) {
    return document.createElement(tag)
  },
  // 用于设置元素的文本节点
  setElementText(el, text) {
    el.textContent = text
  },
  // 用于在给定的 parent 下添加指定元素
  insert(el, parent, anchor = null) {
    parent.insertBefore(el, anchor)
  }
})
function createRenderer(options) {

  // 通过 options 得到操作 DOM 的 API
  const {
    createElement,
    insert,
    setElementText
  } = options

  // 在这个作用域内定义的函数都可以访问那些 API
  function mountElement(vnode, container) {
    // 调用 createElement 函数创建元素
    const el = createElement(vnode.type)
    if (typeof vnode.children === 'string') {
      // 调用 setElementText 设置元素的文本节点
      setElementText(el, vnode.children)
    }
    // 调用 insert 函数将元素插入到容器内
    insert(el, container)
  }

  function patch(n1, n2, container) {
    // ...
  }

  function render(vnode, container) {
    // ...
  }

  return {
    render
  }
}
export { }