function createInvoker(cb: (e) => any) {
  const invoker = (e) => invoker.value(e)
  invoker.value = cb
  return invoker
}
export function patchEvent(el: any, eventName: string, nextValue: (e) => any) {
  const invokers = el._vei || (el.vei = {})
  const exits = invokers[eventName]
  if (exits && nextValue) {
    exits.value = nextValue
  } else {
    // onClick=click
    const event = eventName.slice(2).toLowerCase();
    if (nextValue) {
      const invoker = invokers[eventName] = createInvoker(nextValue)
      el.addEventListener(event, invoker)
    } else if (exits) {
      el.removeEventListener(event, exits)
      invokers[eventName] = undefined
    }
  }
}
