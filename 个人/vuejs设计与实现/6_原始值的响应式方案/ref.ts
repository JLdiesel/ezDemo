function reactive(obj) { return obj };
/* 
ref 本质上是一个“包裹
对象”。因为 JavaScript 的 Proxy 无法提供对原始值的代理，所以我们
需要使用一层对象作为包裹，间接实现原始值的响应式方案。 */
function ref(val) {
  const wrapper = {
    value: val
  }
  Object.defineProperty(wrapper, '__v_isRef', {
    value: true
  })
  return reactive(wrapper)
}

function toRef(obj, key) {
  const wrapper = {
    get value() {
      return obj[key]
    },
    set value(val) {
      obj[key] = val
    }
  }
  Object.defineProperty(wrapper, '__v_isRef', {
    value: true
  })
  return wrapper
}
function toRefs(obj) {
  const ret = {
  }
  for (const key in obj) {
    ret[key] = toRef(obj, key)
  }
  return ret
}
function proxyRefs(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver)
      // 自动脱 ref 实现：如果读取的值是 ref，则返回它的 value 属性值
      return value.__v_isRef ? value.value : value
    },
    set(target, key, newValue, receiver) {
      // 通过 target 读取真实值
      const value = target[key]
      // 如果值是 Ref，则设置其对应的 value 属性值
      if (value.__v_isRef) {
        value.value = newValue
        return true
      }
      return Reflect.set(target, key, newValue, receiver)
    }

  })
}