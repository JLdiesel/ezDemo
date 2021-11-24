const names = ['abc', 'cba', 'nba'];
names[Symbol.iterator] = interator;
function interator() {
  let index = 0;
  const self = this;
  return {
    next() {
      if (index > self.length - 1) {
        return {
          value: undefined,
          done: true,
        };
      } else {
        return {
          value: self[index++] + '1',
          done: false,
        };
      }
    },
  };
}
for (const name of names) {
  console.log(name);
}
