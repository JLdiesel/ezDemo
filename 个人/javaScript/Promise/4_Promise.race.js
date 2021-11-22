const promise1 = new Promise((res, rej) => {
  setTimeout(() => {
    res(1);
  }, 2000);
});
const promise2 = new Promise((res, rej) => {
  setTimeout(() => {
    res(2);
  }, 1000);
});
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2);
  }, 2000);
});
const promise4 = new Promise((res, rej) => {
  setTimeout(() => {
    res(3);
  }, 100);
});
const arr = [promise1, promise2, promise3, promise4];
const arr2 = [promise1, promise2, promise4];
//只要有一个返回了值，就立即结束，返回第一个返回值
Promise.race(arr).then(
  (res) => {
    console.log(res);
  },
  (rej) => {
    console.log(rej);
  }
);
