interface eventBus {
  [index: string]: handlers;
}
type handlers = {
  callback: Function;
  thisArg?: unknown;
}[];
class EventBus {
  private eventBus: eventBus;
  constructor() {
    this.eventBus = {};
  }
  on(
    eventName: string,
    callback: (...arg: unknown[]) => void,
    thisArg?: unknown
  ) {
    let handlers: handlers = this.eventBus[eventName];
    if (!handlers) {
      handlers = [];
      this.eventBus[eventName] = handlers;
    }
    handlers.push({
      callback,
      thisArg,
    });
  }
  off(eventName: string, callback: (...arg: unknown[]) => void) {
    const handlers: handlers = this.eventBus[eventName];
    if (!handlers) return;
    // const newHandlers = [...handlers];
    for (const item of handlers) {
      if (item.callback === callback) {
        const index = handlers.indexOf(item);
        handlers.splice(index, 1);
      }
    }
    // for (let i = 0; i < newHandlers.length; i++) {
    //   const handler = newHandlers[i];
    //   if (handler.callback === callback) {
    //   }
    // }
  }
  emit(eventName: string, ...payload: unknown[]) {
    const handlers = this.eventBus[eventName];
    if (!handlers) return;
    handlers.forEach((handler) => {
      handler.callback.apply(handler.thisArg, payload);
    });
  }
}
const eventBus = new EventBus();
eventBus.on(
  'abc',
  function (abc: unknown) {
    console.log(abc);
  },
  { fn: '123' }
);
function bgc(this: { fn: string }, abc: unknown) {
  console.log(abc + this.fn);
}
eventBus.on('abc', bgc, { fn: '123' });
eventBus.emit('abc', 123);

eventBus.off('abc', bgc);
eventBus.emit('abc', 123);
