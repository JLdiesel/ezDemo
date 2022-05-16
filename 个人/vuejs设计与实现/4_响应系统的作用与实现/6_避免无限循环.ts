const obj={foo:0}
effect(() => obj.foo++)
/* 
在该句中，既会读取obj.foo的值，又会设置obj.foo的值，
首先读取obj.foo的值，会触发track操作，把该值+1后又赋值给obj.foo，此时会触发trigger操作，
即把桶中的副作用函数取出并执行。
此时第一次副作用函数还没执行完，又要执行下次副作用函数，会导致无限循环调用自己

*/

/* 
解决方法：如果trigger触发的副作用函数和当前正在执行的副作用函数相同，则不触发执行
*/
function trigger(target,key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return;
  const effects = depsMap.get(key);
  const effectsToRun = new Set<() => void>();
  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })
  effectsToRun.forEach(effectFn=>effectFn())
}
export {}