import { isFunction } from '@vue/shared';
import {
  effectFn,
  ReactiveEffect,
  trackEffects,
  triggerEffects
} from './effect';

interface computedOptions {
  get(): any;
  set(): void;
}
class ComputedRefImpl {
  effect: ReactiveEffect;
  _dirty = true;
  _v_isReadonly = true;
  _v_isRef = true;
  _value: any;
  public dep = new Set<effectFn>();
  constructor(public getter: () => any, public setter: (newVal: any) => void) {
    //将用户的getter放到effect中,执行后会收集依赖
    this.effect = new ReactiveEffect(getter, () => {
      //依赖变化会执行函数
      if (!this._dirty) {
        this._dirty = true;
        //触发更新
        triggerEffects(this.dep);
      }
    });
  }
  get value() {
    // 收集依赖
    trackEffects(this.dep);
    if (this._dirty) {
      //说明这个值是脏的
      this._dirty = false;
      this._value = this.effect.run();
    }
    return this._value;
  }
  set value(newVal) {
    this.setter(newVal);
  }
}
export function computed(
  options: computedOptions
): InstanceType<typeof ComputedRefImpl>;
export function computed(
  options: () => unknown
): InstanceType<typeof ComputedRefImpl>;
export function computed(getterOrOption: any) {
  const onlyGetter = isFunction(getterOrOption);
  let getter;
  let setter;
  if (onlyGetter) {
    getter = getterOrOption;
    setter = () => {
      console.warn('no set');
    };
  } else {
    getter = getterOrOption.get;
    setter = getterOrOption.set;
  }
  return new ComputedRefImpl(getter, setter);
}
