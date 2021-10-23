const func1 = () => new Promise((res, rej) => {
  setTimeout(() => {
    res(1)
  }, 1000);
});
const func2 = () => new Promise((res, rej) => {
  setTimeout(() => {
    res(2)
  }, 1000);
});
const func3 = () => new Promise((res, rej) => {
  setTimeout(() => {
    res(3)
  }, 1000);
});
(async () => {
  const obj = {}
  obj[Symbol.asyncIterator] = async function* () {
    yield func1();
    yield func2();
    yield func3();
  }
  for await (let item of obj) {
    console.log(item);
  }
})();