import { isObject, isRef } from '@vue/shared';
import {
  effectFn,
  track,
  trackEffects,
  trigger,
  triggerEffects
} from './effect';
import { isReactive, reactive } from './reactive';
function toReactive(value: any) {
  return isObject(value) ? reactive(value) : value;
}
class RefImplement<T> {
  _value: any;
  public dep = new Set<effectFn>();
  public v_is_Ref = true;
  constructor(public rawValue: T) {
    this._value = toReactive(rawValue);
  }
  get value() {
    trackEffects(this.dep);
    return this._value;
  }
  set value(newVal) {
    if (newVal !== this.rawValue) {
      this._value = toReactive(newVal);
      this.rawValue = newVal;
      triggerEffects(this.dep);
    }
  }
}
export function ref(value: any) {
  return new RefImplement(value);
}
function unref(ref) {
  return isRef(ref) ? ref.value : ref;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    }
    else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
export function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs)
    ? objectWithRefs
    : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}