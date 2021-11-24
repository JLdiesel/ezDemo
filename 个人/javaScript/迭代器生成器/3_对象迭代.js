const obj = {
  names: ['abc', 'cba', 'nba'],
  [Symbol.iterator]: interator,
};
// names[Symbol.iterator] = interator;
function interator() {
  let index = 0;
  return {
    next: () => {
      if (index > this.names.length - 1) {
        return {
          value: undefined,
          done: true,
        };
      } else {
        return {
          value: this.names[index++] + '1',
          done: false,
        };
      }
    },
  };
}
const iterator = obj[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
for (const name of obj) {
  console.log(name);
}
