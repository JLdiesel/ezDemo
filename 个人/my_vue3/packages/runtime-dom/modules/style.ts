export function patchStyle(el: HTMLElement, prevValue: any, nextValue: any) {
  if (!nextValue) {
    if (prevValue) {
      for (const key in prevValue) {
        el.style[key as any] = ''
      }
    }
  } else {
    // 样式需要比对差异
    for (const key in nextValue) {
      el.style[key as any] = nextValue[key]
    }
    if (prevValue) {
      for (const key in prevValue) {
        debugger
        if (!nextValue[key]) {
          el.style[key as any] = ''
        }
      }
    }
  }

}
