const promise1 = new Promise((res, rej) => {
  setTimeout(() => {
    rej(1);
  }, 2000);
});
const promise2 = new Promise((res, rej) => {
  setTimeout(() => {
    rej(2);
  }, 1000);
});
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2);
  }, 2000);
});
const promise4 = new Promise((res, rej) => {
  setTimeout(() => {
    rej(3);
  }, 100);
});
const arr = [promise1, promise2, promise3, promise4];
const arr2 = [promise1, promise2, promise4];
//至少等到一个fullfilled才会返回值
Promise.any(arr).then(
  (res) => {
    console.log('res', res);
  },
  (rej) => {
    //如果全是reject才会进入err方法内,并报[AggregateError: All promises were rejected]
    //err.erros可以返回所有错误数组  和Promise.all相反
    console.log('rej', rej.errors); //[ 1, 2, 2, 3 ]
  }
);
