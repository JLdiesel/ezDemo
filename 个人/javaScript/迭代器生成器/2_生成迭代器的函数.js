function createArrayInterator(arr) {
  let index = 0;
  return {
    next: function () {
      if (index < arr.length) {
        return { done: false, value: arr[index++] };
      } else {
        return { done: true, value: undefined };
      }
    },
  };
}
const nums = ['abc', 'cba', '123'];
const numsInterator = createArrayInterator(nums);
console.log(numsInterator.next());
console.log(numsInterator.next());
console.log(numsInterator.next());
console.log(numsInterator.next());
console.log(numsInterator.next());

//创建一个无限的迭代器
function createNumberInterator() {
  let index = 0;
  return {
    next: function () {
      return { done: false, value: index++ };
    },
  };
}
const intera = createNumberInterator();
console.log(intera.next());
console.log(intera.next());
console.log(intera.next());
console.log(intera.next());
console.log(intera.next());
console.log(intera.next());
console.log(intera.next());
