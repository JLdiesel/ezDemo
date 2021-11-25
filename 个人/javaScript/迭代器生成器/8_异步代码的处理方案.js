function requestData(url) {
  return new Promise((res) => {
    setTimeout(() => {
      res(url);
    }, 1000);
  });
}

// requestData('jl')
//   .then((res) => {
//     return requestData(res + 'jjjj');
//   })
//   .then((res) => {
//     return requestData(res + 'llll');
//   })
//   .then((res) => {
//     console.log(res);
//   });
function* getData() {
  const res = yield requestData('jl');
  const res1 = yield requestData(res + '111');
  const res2 = yield requestData(res1 + '222');
  const res3 = yield requestData(res2 + '333');
  const res4 = yield requestData(res3 + '444');
  console.log(res4);
}
const generator = getData();
//手动执行生成器函数
// generator.next().value.then((res) => {
//   console.log(res);
// });

//自动化执行生成器函数
function execGenerator(genFn) {
  const generator = genFn();
  function exec(res) {
    const result = generator.next(res);
    if (result.done) return result.value;
    result.value.then((res) => {
      exec(res);
    });
  }
  exec();
}
execGenerator(getData);
