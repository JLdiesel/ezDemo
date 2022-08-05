import { isReactive } from './reactive';
import { fnType, ReactiveEffect } from './effect';
interface watchOptions {
  deep?: boolean;
}
function traversal(target: any, set = new Set()) {
  if (set.has(target)) return target;
  if (typeof target === 'object' && target !== null) {
    set.add(target);
    for (const key in target) {
      console.log(target[key]);
      traversal(target[key], set);
    }
  }
}
export function watch<T>(
  source: T extends () => any ? ReturnType<T> : T,
  cb: (newVal: T, oldVal: T, cleanupFn?: (cleanup: () => void) => void) => void,
  options?: watchOptions
) {
  let getter, oldVal: T;
  if (isReactive(source)) {
    if (options?.deep) {
      getter = () => traversal(source);
    } else {
      getter = () => source;
    }
  }
  let cleanup: () => void;
  const cleanupFn = (fn: () => void) => {
    cleanup = fn;
  };
  const job = () => {
    if (cleanup) cleanup();

    const newVal = effect.run() as T;
    cb(newVal, oldVal, cleanupFn);
    oldVal = newVal;
  };
  const effect = new ReactiveEffect(getter as fnType, job);
  oldVal = effect.run() as T;
}
