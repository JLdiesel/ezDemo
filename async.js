/* async function test() {
    console.log("async1");
    await new Promise((resolve, reject) => {
        resolve(1)
    });
    console.log('async2');
};
setTimeout(function () {
    console.log("setTimeout");
}, 0);
test();
new Promise(function (resolve) {
    console.log("promise1");
    resolve();
}).then(function () {
    console.log("promise2");
});
console.log('end');
 */
/* let request1 = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('request1返回的值');
        }, time * 1000);
    });
};

let request2 = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('request2返回的值');
        }, time * 1000);
    });
};

let request3 = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('request3返回的值');
        }, time * 1000);
    });
}
async function request() {
    let resolve1 = await request1(1);
    console.log(resolve1);
    resolve2 = await request2(3);
    console.log(resolve2);
    resolve3 = await request3(5);
    console.log(resolve3);
}
request(); */
/* async function foo() {
  console.log(await Promise.resolve(Promise.resolve('foo').then(res => {
   console.log('foo2');
  })));
  console.log('foo3');
}
async function bar() {
    console.log(await 'bar');
}
async function abc() {
    console.log('abc');
}
foo();
bar();
abc(); */

/* 
 console.log("script start");

async function async1() {
 console.log( await async2());
  console.log("async1 end");
}
async function async2() {
  console.log("async2 end");
  Promise.resolve(12).then(() => {
    console.log("async2 end1");
  });
 async function abc() {
    console.log(123);
    return  console.log(await Promise.resolve(12).then(() => {
    console.log("async2 end3");
  }));
  }
  return abc()
}
async1();

setTimeout(function () {
  console.log("setTimeout");
}, 0);

new Promise((resolve) => {
  console.log("Promise");
  resolve();
})
  .then(function () {
      console.log("promise1");    
  })
  .then(function () {
    console.log("promise2");
  });

console.log("script end");
 */
/* 
script start
async2 end
console.log("Promise");
console.log("script end");
async2 end1
promise1
promise2
async1 end
setTimeout
*/
/* 
console.log("script start");

async function async1() {
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2 end");
  Promise.resolve().then(() => {
    console.log("async2 end1");
  });
}
async1();

setTimeout(function () {
  console.log("setTimeout");
}, 0);

new Promise((resolve) => {
  console.log("Promise");
  resolve();
})
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  });

console.log("script end"); */

function f1() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(1);
    }, 1000);
  });
}
function f2() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(2);
    }, 1000);
  });
}
function f3() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(3);
    }, 1000);
  });
}
async function a() {
  console.log(new Date());
  const a1 = f1();
  const a2 = f2();
  const a3 = f3();
  console.log(await a1);
  console.log('输出1');
  console.log(await a2);
  console.log('输出2');
  console.log(await a3);
  console.log('输出3');
  console.log(new Date());
}
a();
