const STATUS_PENDING = 'pending';
const STATUS_FULFILLED = 'fulfilled';
const STATUS_REJECTED = 'rejected';
class JLPromise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.status = STATUS_PENDING;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (value) => {
      if (this.status === STATUS_PENDING) {
        queueMicrotask(() => {
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
        this.onFulfilledCallbacks.push(() => {
          try {
            const value = onFulfilled(this.value);
            res(value);
          } catch (error) {
            rej(error);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            const reason = onRejected(this.reason);
            res(reason);
          } catch (error) {
            rej(error);
          }
        });
      }
    });
  }
}
const promise = new JLPromise((res, rej) => {
  res(1234);
  rej(123);
});
promise
  .then(
    (res) => {
      console.log('res1', res);
      return 123;
    },
    (err) => {
      console.log('err1', err);
      return 123;
    }
  )
  .then(
    (res) => {
      console.log('res3', res);
    },
    (err) => {
      console.log('err3', err);
    }
  );
setTimeout(() => {
  promise.then(
    (res) => {
      console.log('res2', res);
    },
    (err) => {
      console.log('err2', err);
    }
  );
}, 1000);
