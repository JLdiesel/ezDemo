import { isFunction } from '@vue/shared';
import {
  effectFn,
  ReactiveEffect,
  trackEffects,
  triggerEffects
} from './effect';

interface computedOptions<T> {
  get(): T;
  set(): void;
}
class ComputedRefImpl<T> {
 private effect: ReactiveEffect;
 private _dirty = true;
 private _v_isReadonly = true;
 private _v_isRef = true;
  private _value: T=undefined as unknown as T;
  private dep = new Set<effectFn>();
  constructor(private getter: () =>  T, private setter: (newVal: any) => void) {
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
      this._value = this.effect.run() as T;
    }
    return this._value;
  }
  set value(newVal) {
    this.setter(newVal);
  }
}
export function computed<T>(
  options: computedOptions<T>
): InstanceType<typeof ComputedRefImpl<T>>;
export function computed<T>(
  options: () => T
): InstanceType<typeof ComputedRefImpl<T>>;
export function computed<T>(getterOrOption: any) {
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
  return new ComputedRefImpl<T>(getter, setter);
}
