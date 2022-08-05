import {
  effectFn,
  track,
  trackEffects,
  trigger,
  triggerEffects
} from './effect';
import { isReactive, reactive } from './reactive';
function toReactive(value: any) {
  return isReactive(value) ? value : reactive(value);
}
class RefImplement<T> {
  _value: any;
  public dep = new Set<effectFn>();
  private v_is_Ref = true;
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
