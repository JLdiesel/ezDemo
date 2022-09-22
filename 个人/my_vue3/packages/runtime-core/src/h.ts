import { isArray, isObject, isString, isVnode } from '@vue/shared';
import { createVnode } from './vnode';
/* 
h('div)
h('div',{style:{"color":"red"}})
h('div',{style:{"color":"red"}},'hello')

h('div',null,'hello','world')
h('div',null,[h('span')])
h('div',null,h('span'))
*/

export function h(type, propsChildren?, children?) {
  const l = arguments.length;
  if (l === 2) {
    // h('div', 'hello')
    // h('div', { style: { "color": "red" } })
    // h('div', [h('span')])
    if (!isArray(propsChildren) && isObject(propsChildren)) {
      if (isVnode(propsChildren)) {
        return createVnode(type, null, [propsChildren]);
      }
      return createVnode(type, propsChildren);
    } else {
      return createVnode(type, null, propsChildren);
    }
  } else {
    if (l > 3) {
      //如果大于三个，那从第三个之后的都是孩子
      children = Array.from(arguments).slice(2);
    } else if (l === 3 && isVnode(children)) {
      children = [children];
    }
    return createVnode(type, propsChildren, children); //children只能是文本或数组
  }
}
