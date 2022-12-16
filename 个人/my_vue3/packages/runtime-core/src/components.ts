import { reactive, proxyRefs } from "@vue/reactivity";
import { hasOwn, isFunction, isObject } from "@vue/shared";
import { initProps } from "./componentsProps";

export function createComponentsInstance(vnode) {
  debugger
  //组件实例
  const instance = {
    data: null,
    //vue2源码中组件的虚拟节点叫$vnode 渲染的内容叫_vnode
    vnode, //Vue3中的虚拟节点
    subTree: null, //渲染的组件内容
    isMounted: false,
    update: null,
    props: {},
    attrs: {},
    propsOptions: vnode.type.props,
    proxy: null,
    setupState: {}
  };
  return instance
}
const publicPropertyMap = {
  $attrs: (i) => i.attrs,
}
const publicInstanceProxy = {
  get(target, key) {
    const { props, data, setupState } = target

    if (hasOwn(setupState, key)) {
      return setupState[key]
    } else if (data && hasOwn(data, key)) {
      return data[key];
    } else if (props && hasOwn(props, key)) {
      return props[key]
    }
    let getter = publicPropertyMap[key]
    if (getter) {
      return getter(target)
    }
  },
  set(target, key, value) {
    const { props, data, setupState } = target
    if (hasOwn(setupState, key)) {
      setupState[key] = value
      return true
    } else if (data && hasOwn(data, key)) {
      data[key] = value
      return true
      // 用户操作的属性是代理对象，这里被屏蔽了
      // 但是我们通过instance.props改变可以拿到真实的props
    } else if (props && hasOwn(props, key)) {
      console.warn('attempting to mutate prop' + (key as string))
      return false
    }
    return true

  }
}
export function setupComponent(instance) {
  const { props, type } = instance.vnode
  initProps(instance, props);
  instance.proxy = new Proxy(instance, publicInstanceProxy)
  const { data, setup } = type
  if (data) {
    if (!isFunction(data)) return console.warn('data option must be a function ')
    instance.data = reactive(data.call(instance.proxy))
  }
  if (setup) {
    const setupContext = {
      emit: (event: string, ...args) => { //组件通信的实现原理
        const eventName = `on${event[0].toUpperCase() + event.slice(1)}`
        console.log(instance)
        //找到虚拟节点的属性，有存放在props
        const handler = instance.vnode.props[eventName]
        handler && handler(...args)
      }
    }
    const setupResult = setup(instance.props, setupContext);
    if (isFunction(setupResult)) {
      instance.render = setupResult
    } else if (isObject(setupResult)) {
      // 对内部的ref 取消 .value
      instance.setupState = proxyRefs(setupResult)
    }
  }
  if (!instance.render) {
    instance.render = type.render
  }
}

