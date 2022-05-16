/* 
watch本质是对effect的二次封装。
*/
interface watchOptions{
  immediate?: boolean,
  //当flush=post时，代表调度函数需要将副作用函数放到一个微任务中，并等待dom更新结束后再执行
  //为prev时，在dom更新开始前执行
  //为sync时，和无参类似
  flush?:'pre'|'post'|'sync'
}
let finalData
watch(obj, async (newVal, oldValue, onInvalidate) => {
  //定义一个标志，代表当前副作用函数是否过期，默认为false，代表没有过期
  let expired = false;
  //如果该副作用过期了，则不赋值finalData
  onInvalidate(() => {
    expired=true
  })
  const res = await fetch('www.baidu.com')
  if (!expired) {
    finalData=res
  }
  console.log('变化了');
}, {
  immediate: true,
  flush:'post'
})

function watch<sourceType>(source:sourceType, cb:(newVal:sourceType,oldValue:sourceType,onInvalidate?)=>void,options:watchOptions) {
  //source可以传一个getter
  let getter
  if (typeof source === 'function') {
    getter=source
  } else {
    //递归遍历该源数据，深度监听
    getter=()=>traverse(source)
  }
  let oldValue: sourceType, newValue: sourceType
  //cleanup用来存储用户注册的过期回调
  let cleanup
  //定义onInvalidate函数
  function onInvalidate(fn) {
    cleanup=fn
  }
  //提取调度函数为一个独立的job函数
  const job = () => {
      //重新执行副作用函数得到的是新值
    newValue = effectFn() as sourceType
    
    //在第二次进入job时，才会调用cleanup，并且fn是第一个副作用的过期函数，对第二个不影响
      if (cleanup) {
        //在调用回调函数cb之前，先调用过期回调
        cleanup()
      }
      //当源数据发生改变时执行callback
      cb(oldValue, newValue,onInvalidate)
      //把新值赋给老值
      oldValue=newValue
  }
  const effectFn = effect(() => getter(), {
    lazy:true,
    scheduler: () => {
      //如果flush为post，则将其放到微任务中执行
      if (options.flush === 'post') {
        queueMicrotask(() => {
          job()
        })
      } else {
          job()
      }
    }
  })
  if (options.immediate) {
    //如果immediate为true则立即执行cb
    job()
  } else {
    oldValue=effectFn() as sourceType
  }
}
function traverse(value:unknown,seen=new Set()) {
  //如果要读取的数据是原始值或者已经被读取过了，那么什么都不做
  if (typeof value !== 'object' || value === null || seen.has(value)) return;
  //避免循环引用
  seen.add(value);
  for (const key in value) {
    traverse(value[key],seen)
  }
  return value
}