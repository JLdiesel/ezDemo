const names = ['jl', 'lyj'];
// names[Symbol.iterator] = interator;
/* function arrAterator() {
  let index = 0;
  return {
    next: () => {
      if (index < this.length) {
        return {
          value: this[index++] + '1',
          done: false,
        };
      } else {
        return {
          value: undefined,
          done: true,
        };
      }
    },
  };
}
// yield*会yield arr内的所有元素
function* iterator(arr) {
  yield* arr;
}
const arritera = iterator(names);
for (const item of arritera) {
  console.log(item);
} */
//创建一个函数，这个函数可以迭代一个范围内的数字  10~20
function* createRangeIterator(start, end) {
  let index = start;
  while (index < end) {
    yield index++;
  }

  /* let index = start;
  return {
    next: () => {
      if (index < end) {
        return {
          value: index++,
          done: false,
        };
      } else {
        return {
          value: undefined,
          done: true,
        };
      }
    },
  }; */
}
const iteras = createRangeIterator(10, 20);
// console.log(iteras.next());
// console.log(iteras.next());
// console.log(iteras.next());
// console.log(iteras.next());
for (const item of iteras) {
  console.log(item);
}
