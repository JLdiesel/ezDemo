type eventFn = Array<(e) => any> | ((e) => any)
function createInvoker(cb: eventFn) {
  const invoker = (e) => {
    if (e.timeStamp < invoker.attached) return
    if (Array.isArray(invoker.value)) {
      invoker.value.forEach(fn => {
        fn(e)
      });
    } else {
      invoker.value(e)
    }
  }
  invoker.value = cb
  invoker.attached = performance.now()
  return invoker
}
export function patchEvent(el: any, eventName: string, nextValue: eventFn) {
  const invokers = el._vei || (el._vei = {})
  const exits = invokers[eventName]
  if (exits && nextValue) {
    console.log('进入了')
    exits.value = nextValue
    exits.attached = performance.now()
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
