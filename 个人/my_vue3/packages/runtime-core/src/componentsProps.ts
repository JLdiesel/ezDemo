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
