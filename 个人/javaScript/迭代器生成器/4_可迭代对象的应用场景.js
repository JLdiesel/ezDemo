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
// for of
for (const item of obj) {
  console.log(item);
}

//扩展运算符
console.log([...obj]); //[ 'abc1', 'cba1', 'nba1' ]
//ES2018中新增的特性 非迭代器
console.log({ ...obj }); /* {
    names: [ 'abc', 'cba', 'nba' ],
    [Symbol(Symbol.iterator)]: [Function: interator]
  } */
//解构语法
const [name, name1] = obj;
console.log(name, name1);
// 创建其他对象
const set = new Set(obj);
console.log(set);

const arr = Array.from(obj);
console.log(arr);
