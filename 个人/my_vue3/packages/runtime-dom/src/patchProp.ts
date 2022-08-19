import { patchClass } from "../modules/class";

export function patchProp(
  el: Element,
  key: string,
  prevValue: any,
  nextValue: any
) {
  //类名 el.className
  if (key === 'class') {
    patchClass(el,nextValue)
  }
  //样式 el.style
}
