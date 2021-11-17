function foo() {
  return new Promise((res, rej) => {
    console.log('promise执行');
  });
}
const fooPromise = foo();

const promise = new Promise((res, rej) => {
  console.log('函数执行');
});

class Person {
  constructor(callback) {
    let res = function () {
      console.log(123);
    };
    let rej = function () {
      console.log(456);
    };
    callback(res, rej);
  }
}
const p = new Person((res, rej) => {
  res();
  rej();
});
