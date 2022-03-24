//声明构造函数
function Promise(executor) {
  //添加属性
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  this.callbacks = [];
  const self = this;
  //resolve
  function resolve(data) {
    if (self.PromiseState !== 'pending') return;
    //1.修改对象的状态(promiseState)
    self.PromiseState = 'fulfilled'; //resolved
    //2.设置对象结果值(promiseResult)
    self.PromiseResult = data;
    //调用成功的回调函数
    setTimeout(() => {
      self.callbacks.forEach((item) => {
        item.onResolved(data);
      });
    });
  }
  //reject
  function reject(data) {
    if (self.PromiseState !== 'pending') return;
    //1.修改对象的状态(promiseState)
    self.PromiseState = 'rejected'; //resolved
    //2.设置对象结果值(promiseResult)
    self.PromiseResult = data;
    //调用失败的回调
    setTimeout(() => {
      self.callbacks.forEach((item) => {
        item.onRejected(data);
      });
    });
  }

  try {
    //同步调用executor 【执行器函数】
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
//then方法
Promise.prototype.then = function (onResolved, onRejected) {
  const self = this;
  if (typeof onRejected !== 'function') {
    onRejected = (reason) => {
      throw reason;
    };
  }
  if (typeof onResolved != 'function') {
    onResolved = (value) => value;
  }
  return new Promise((resolve, reject) => {
    //封装函数
    function callback(type) {
      try {
        let result = type(self.PromiseResult);
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v);
            },
            (r) => {
              reject(r);
            }
          );
        } else {
          //结果的对象状态为成功
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    }
    if (this.PromiseState === 'fulfilled') {
      setTimeout(() => {
        callback(onResolved);
      });
    }
    if (this.PromiseState === 'rejected') {
      setTimeout(() => {
        callback(onRejected);
      });
    }
    if (this.PromiseState === 'pending') {
      //保存回调函数
      this.callback.push({
        onRejected: function () {
          callback(onRejected);
        },
        onResolved: function () {
          callback(onResolved);
        },
      });
    }
  });
};
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
};
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(
        (v) => {
          resolve(v);
        },
        (r) => {
          reject(r);
        }
      );
    } else {
      resolve(value);
    }
  });
};

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let count = 0;
    let arr = [];
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (v) => {
          //得知对象的状态是成功的
          count++;
          arr[i] = v;
          if (count === promises.length) {
            resolve(arr);
          }
        },
        (r) => {
          reject(r);
        }
      );
    }
  });
};
Promise.race = function (promises) {
  return new Promise((res, rej) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (v) => {
          res(v);
        },
        (r) => {
          rej(r);
        }
      );
    }
  });
};
