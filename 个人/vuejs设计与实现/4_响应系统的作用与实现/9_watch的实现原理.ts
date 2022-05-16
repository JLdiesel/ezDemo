/* 
watch本质是对effect的二次封装。
*/

function watch(source, cb) {
  //source可以传一个getter
  let getter
  if (typeof source === 'function') {
    getter=source
  } else {
    //递归遍历该源数据，深度监听
    getter=()=>traverse(source)
  }
  let oldValue,newValue
  const effectFn = effect(() => getter(), {
    lazy:true,
    scheduler() {
      //重新执行副作用函数得到的是新值
      newValue = effectFn()
      //当源数据发生改变时执行callback
      cb(oldValue, newValue)
      //把新值赋给老值
      oldValue=newValue
    }
  })
  oldValue=effectFn()
}
function traverse(value,seen=new Set()) {
  //如果要读取的数据是原始值或者已经被读取过了，那么什么都不做
  if (typeof value !== 'object' || value === null || seen.has(value)) return;
  //避免循环引用
  seen.add(value);
  for (const key in value) {
    traverse(value[key],seen)
  }
  return value
}
export {}