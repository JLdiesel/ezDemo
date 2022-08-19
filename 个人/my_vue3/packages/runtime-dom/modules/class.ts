export function patchClass(el: Element, nextValue: any) {
  if (nextValue === null) {
    el.removeAttribute('class');
  } else {
    el.className = nextValue;
  }
}
