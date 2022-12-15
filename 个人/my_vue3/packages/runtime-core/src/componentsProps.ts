import { shallowReactive } from '@vue/reactivity';
import { hasOwn } from '@vue/shared';

export function initProps(instance, rawProps) {
  const props = {};
  const attrs = {};
  const option = instance.propsOptions || {};
  if (rawProps) {
    for (const key in rawProps) {
      const value = rawProps[key];
      // 看看用户传的options API中有没有定义个props。如果定义了，就是props，否则就是attrs
      if (hasOwn(option, key)) {
        props[key] = value;
      } else {
        attrs[key] = value;
      }
    }
  }
  //props不希望在组件内部被更改，但是props需要响应式，父组件变化子组件也要变化，用shallowReactive
  instance.props = shallowReactive(props);
  instance.attrs = attrs;
}
export const hasPropsChange = (prevProps = {}, nextProps = {}) => {
  const nextKeys = Object.keys(nextProps)
  //  属性的个数是否发生变化
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true
  }
  //  值是否变化
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i]
    if (nextProps[key] !== prevProps[key]) {
      return true
    }
  }
  return false
}
export function updateProps(prevProps, nextProps) {
  // 看一下属性有没有变化

  if (hasPropsChange(prevProps, nextProps)) {
    for (const key in nextProps) {
      // 属性改了触发响应式 重新渲染
      prevProps[key] = nextProps[key]
    }
    for (const key in prevProps) {
      if (!hasOwn(nextProps, key)) {
        delete prevProps[key]
      }
    }
  }


}