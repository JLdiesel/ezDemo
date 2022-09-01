//for of的原理就是执行数据结构内部的Symbol.interator
//这个函数会返回一个迭代器，每次循环都会执行next方法
const arr = [1, 2, 3, 4];
arr[Symbol.iterator]=function interator() {
  let index = 0;
  const self = this;
  return {
    next() {
      if (index > self.length - 1) {
        return {
          value: undefined,
          done:true
        };
      } else {
        return {
          value: self[index++],
          done:false
        }
      }
    }
  }
}
for (let item of arr) {
  console.log(item);
}
const obj = {
  name: 'jl',
  age: 18,
  0: 100,
  1: 200,
  [Symbol('aaa')]:300
}
Object.prototype[Symbol.iterator]=function interator() {

  const self = this; 
    let index = 0,keys=Reflect.ownKeys(self)
  return {
    next() {
      if (index > keys.length - 1) {
        return {
          value: undefined,
          done:true
        };
      } else {
        return {
          value: self[keys[index++]],
          done:false
        }
      }
    }
  }
}
for (let item of obj) {
  console.log(item);
}
const a = [1, 2, 3]
a[Symbol.iterator] = function () {
  const that=this
  let length=this.length-1
  return {
    next() {
      if (length >= 0) {
        return {
          value: that[length--],
          done:false
        }
      } else {
        return {
          value: undefined,
          done:true
        }
      }
    }
  }
}
console.log([...a])