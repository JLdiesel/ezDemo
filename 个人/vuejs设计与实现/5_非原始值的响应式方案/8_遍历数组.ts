function createReactive(obj: any, isShallow: boolean = false, isReadOnly: boolean = false) {
  const raw = Symbol()
  return new Proxy<typeof obj>(obj, {
    get(target, key, receiver) {
      if (key === raw) {
        return target
      }
      const res = Reflect.get(target, key, receiver)
      //如果是只读并且不是symbol类型的，则不需要建立响应式联系
      if (!isReadOnly&&typeof key !=='symbol') {
        // track(target,key)
      }
      //如果是浅响应，则直接返回原始值
      if (isShallow) {
        return res
      }
      if (typeof res === 'object' && res !== null) {
        //如果数据为只读，则递归包装
        return isReadOnly ? readOnly(res) : createReactive(res)
      }
      return res
    },
    ownKeys(target) {
      //如果操作目标target是数组，则使用length属性作为key并建立响应联系
      track(target, Array.isArray(target) ? 'length' : ITERATE_KEY)
      return Reflect.ownKeys(target)
    },
  })
}
/* 
一个对象能否被for of 迭代，取决于该对象的原型是否实现了@@iterator方法(在ECMAScript中该值为Symbol.iterator)
*/
const obj = {
  val: 0,
  [Symbol.iterator]() {
    return {
      next() {
        return {
          value: obj.val++,
          done: obj.val > 10 ? true : false
        }
      }
    }
  }
}
const arr = [1, 2, 3, 4, 5]
// arr[Symbol.iterator] = function () {
//   const target = this;
//   const len = target.length;
//   let index = 0
//   return {
//     next() {
//       return {
//         value: index < len ? target[index] : undefined,
//         done: index++ >= len
//       }
//     }
//   }
// }
const itr = arr[Symbol.iterator]()
console.log(itr.next());//{ value: 1, done: false }
console.log(itr.next());//{ value: 2, done: false }
console.log(itr.next());//{ value: 3, done: false }
console.log(itr.next());//{ value: 4, done: false }
console.log(itr.next());//{ value: 5, done: false }
console.log(itr.next());//{ value: undefined, done: true }
console.log(arr.values===arr[Symbol.iterator]); //true

export { }