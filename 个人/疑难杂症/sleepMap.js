//遍历一个数组，如果是奇数则打印后延迟一秒，偶数则延后两秒

const arrb = [1, 2, 3, 4, 5, 6, 7];

async function timelog(arr) {
  for (let i = 0; i < arr.length; i++) {
    await log(arr[i]);
  }
  function log(n) {
    return new Promise((res) => {
      if (n % 2 === 0) {
        console.log(n);
        setTimeout(() => {
          res();
        }, 2000);
      } else {
        console.log(n);
        setTimeout(() => {
          res();
        }, 1000);
      }
    });
  }
}

function sleeplog(arr) {
  function log(index) {
    if (arr[index] !== undefined) {
      console.log(arr[index]);
    } else {
      return;
    }
    sleep(arr[index] % 2 === 0 ? 2000 : 1000, index + 1);
  }
  function sleep(time, index) {
    setTimeout(() => {
      log(index);
    }, time);
  }
  log(0);
}
// sleeplog([1, 2, 3, 4]);
// timelog([1, 2, 3, 4]);
// timelogs(promiseArr);

function* itera(items) {
  for (const item of items) {
    yield item;
  }
}
let iterator = itera([1, 2, 3, 4, 5, 6]);
function implement() {
  let { value, done } = iterator.next();
  let time = 2000;
  value % 2 && (time = 1000);
  if (done) return;
  console.log(value);
  setTimeout(implement, time);
}
// implement();
