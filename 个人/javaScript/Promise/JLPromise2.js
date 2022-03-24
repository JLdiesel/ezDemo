const STATUS_PENDING = 'pending';
const STATUS_FULFILLED = 'fulfilled';
const STATUS_REJECTED = 'rejected';
class JLPromise {
  constructor(executor) {
    this.value = undefined; //返回值
    this.reason = undefined; //错误原因
    this.status = STATUS_PENDING; //状态值
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (value) => {
      if (this.status === STATUS_PENDING) {
        queueMicrotask(() => {
          //加到微任务里
          if (this.status !== STATUS_PENDING) return;
          this.status = STATUS_FULFILLED;
          this.value = value;

          this.onFulfilledCallbacks.forEach((fn) => {
            fn(this.value);
          });
        });
      }
    };
    const reject = (reason) => {
      if (this.status === STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== STATUS_PENDING) return;
          this.status = STATUS_REJECTED;

          this.reason = reason;

          this.onRejectedCallbacks.forEach((fn) => {
            fn(this.reason);
          });
        });
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err;
          };
    onFulfilled =
      typeof onFulfilled === 'function'
        ? onFulfilled
        : (value) => {
            throw value;
          };
    return new JLPromise((res, rej) => {
      if (onFulfilled && typeof onFulfilled === 'function') {
        if (this.status === STATUS_FULFILLED) {
          try {
            const value = onFulfilled(this.value);
            res(value);
          } catch (error) {
            rej(error);
          }
        }
      }
      if (onRejected && typeof onRejected === 'function') {
        if (this.status === STATUS_REJECTED) {
          try {
            const reason = onRejected(this.reason);
            res(reason);
          } catch (error) {
            rej(error);
          }
        }
      }
      if (this.status === STATUS_PENDING) {
        if (onFulfilled && typeof onFulfilled === 'function') {
          this.onFulfilledCallbacks.push(() => {
            try {
              //this.value=.then后的res返回值
              const value = onFulfilled(this.value);
              res(value);
            } catch (error) {
              rej(error);
            }
          });
        }
        if (onRejected && typeof onRejected === 'function') {
          this.onRejectedCallbacks.push(() => {
            try {
              const reason = onRejected(this.reason);
              res(reason);
            } catch (error) {
              rej(error);
            }
          });
        }
      }
    });
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  finally(onFinally) {
    this.then(onFinally, onFinally);
  }
  static resolve(value) {
    return new JLPromise((res) => res(value));
  }
  static reject(reason) {
    return new JLPromise((res, rej) => rej(reason));
  }
  static all(promiseArr) {
    return new JLPromise((res, rej) => {
      const values = [];
      promiseArr.forEach((promise) => {
        promise.then((res) => {
          values.push(res);
          if (values.length === promiseArr.length) {
            res(values);
          }
        }, rej);
      });
    });
  }
  static allSettled(promiseArr) {
    return new JLPromise((res) => {
      const results = [];
      promiseArr.forEach((promise) => {
        promise.then(
          (res) => {
            results.push({ status: STATUS_FULFILLED, value: res });
            if (results.length === promiseArr.length) {
              res(values);
            }
          },
          (err) => {
            results.push({ status: STATUS_REJECTED, value: err });
            if (results.length === promiseArr.length) {
              res(values);
            }
          }
        );
      });
    });
  }
  static race(promiseArr) {
    return new JLPromise((resolve, reject) => [
      promiseArr.forEach((promise) => {
        promise.then(resolve, reject);
      }),
    ]);
  }
  static any(promiseArr) {
    return new JLPromise((resolve, reject) => {
      const resultArr = [];
      promiseArr.forEach((promise) => {
        promise.then(resolve, (err) => {
          resultArr.push(err);
          if (resultArr.length === promiseArr.length) {
            reject(new AggregateError(resultArr));
          }
        });
      });
    });
  }
}

const promise = new JLPromise((res, rej) => {
  debugger;
  // res(1234);
  console.log(123);
  setTimeout(() => {
    res(123);
  }, 0);
});
promise
  .then((res) => {
    console.log('res1', res);
    return 123;
  })
  .then((res) => {
    console.log('res3', res);
    return 222;
  })
  .then((res) => {
    console.log('res4', res);
    return 333;
  })
  .catch((err) => {
    console.log('catch', err);
  })
  .finally((res) => {
    console.log('finally', res);
  });
setTimeout(() => {
  new JLPromise((res) => res(512)).then(
    (res) => {
      console.log('res2', res);
    },
    (err) => {
      console.log('err2', err);
    }
  );
}, 0);
