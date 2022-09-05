function shouldSetAsProps(el, key, value) {
  // 特殊处理
  // 因为有一些 DOM Properties 是只读的
  if (key === 'form' && el.tagName === 'INPUT') return false
  // 兜底
  // 用 in 操作符判断 key 是否存在对应的 DOM Properties
  return key in el
}
/* 
vnode.props 对象中
定义的属性值的类型并不总是与 DOM 元素属性的数据结构保持一致，
这取决于上层 API 的设计
*/
const vnode = {
  type: 'p',
  props: {
    // 使用 normalizeClass 函数对值进行序列化
    // class: normalizeClass([
    //   'foo bar',
    //   { baz: true }
    // ])
    // 最终转化为
    class: 'foo bar baz'
  }
}

const renderer = createRenderer({
  createElement(tag) {
    return document.createElement(tag)
  },
  setElementText(el, text) {
    el.textContent = text
  },
  insert(el, parent, anchor = null) {
    parent.insertBefore(el, anchor)
  },
  // 将属性设置相关操作封装到 patchProps 函数中，并作为渲染器选项传递
  patchProps(el, key, prevValue, nextValue) {
    //对class进行特殊处理 因为className性能高
    if (key === 'class') {
      el.className = nextValue || ''
    } else if (shouldSetAsProps(el, key, nextValue)) {
      const type = typeof el[key]
      // 如果是布尔类型，并且 value 是空字符串，则将值矫正为 true
      if (type === 'boolean' && nextValue === '') {
        el[key] = true
      } else {
        el[key] = nextValue
      }
    } else {
      /* 
       如果要设置的属性没有对应的 DOM Properties，则使用setAttribute 函数设置属性
      */
      el.setAttribute(key, nextValue)
    }
  },
  createText(text) {
    return document.createTextNode(text)
  },
  setText(el, text) {
    el.nodeValue = text
  },

})

function mountElement(vnode, container) {
  const el = createElement(vnode.type)
  // 省略 children 的处理

  if (vnode.props) {
    for (const key in vnode.props) {
      patchProps(el, key, null, vnode.props[key])
    }
  }

  insert(el, container)
}
