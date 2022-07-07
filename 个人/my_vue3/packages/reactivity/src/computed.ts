import { isFunction, isObject } from '@vue/shared';
import { ReactiveEffect } from './effect';

interface computedOptions {
  get(): any;
  set(): void;
}
class ComputedRefImpl {
  effect: ReactiveEffect;
  _dirty = true;
  _v_isReadonly = true;
  _v_isRef = true;
  _value;
  constructor(public getter: () => any, public setter: (newVal: any) => void) {
    //将用户的getter放到effect中,执行后会收集依赖
    this.effect = new ReactiveEffect(getter, () => {
      //依赖变化会执行函数
    });
  }
  get value() {
    if (this._dirty) {
      //说明这个值是脏的
      this._value = this.effect.run();
    }
    return this._value;
  }
  set value(newVal) {
    this.setter(newVal);
  }
}
export function computed(options: computedOptions): { value: any };
export function computed(options: () => unknown): { value: any };
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
