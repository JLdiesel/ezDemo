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
  reject(2);
});
const promise4 = new Promise((res, rej) => {
  setTimeout(() => {
    res(3);
  }, 1000);
});
const arr = [promise1, promise2, promise3, promise4];
const arr2 = [promise1, promise2, promise4];
//如果有一个返回了rejcet，则会直接结束，进入错误捕获 直接返回 2
Promise.all(arr).then(
  (res) => {
    console.log(res);
  },
  (rej) => {
    console.log(rej);
  }
);
//全部按顺序执行,执行结果返回一个resolve数组 [1,2,3]
Promise.all(arr2).then((res) => {
  console.log(res);
});
