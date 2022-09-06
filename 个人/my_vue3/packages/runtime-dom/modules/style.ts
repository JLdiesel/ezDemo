export function patchStyle(el: HTMLElement, prevValue: any, nextValue: any) {
  // 样式需要比对差异
  for (const key in nextValue) {

    el.style[key as any] = nextValue
  }
  if (prevValue) {
    for (const key in prevValue) {
      if (!(key in nextValue)) {
        el.style[key as any] = ''
      }
    }
  }
}
