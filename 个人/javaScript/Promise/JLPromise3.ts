type fnType = (value: unknown) => void;
type extectorType = (resolve: fnType, reject: fnType) => void;
enum statusEnum {
  pending = 'pending',
  fulfilled = 'fulfilled',
  rejected = 'rejected',
}
export class JLPromise {
  status: statusEnum;
  value: unknown;
  reason: unknown;
  onFulfilledFns: fnType[];
  onRejectedFns: fnType[];
  constructor(executor: extectorType) {
    this.status = statusEnum.pending;
    this.onFulfilledFns = [];
    this.onRejectedFns = [];
    const reject: fnType = (error: unknown): void => {
      if (this.status === statusEnum.pending) {
        queueMicrotask(() => {
          if (this.status !== statusEnum.pending) return;
          this.status = statusEnum.rejected;
          this.reason = error;
          if (this.onRejectedFns) {
            this.onRejectedFns.forEach((item) => {
              item(error);
            });
          }
        });
      }
    };
    const resolve: fnType = (value: unknown): void => {
      if (this.status === statusEnum.pending) {
        queueMicrotask(() => {
          if (this.status !== statusEnum.pending) return;
          this.status = statusEnum.fulfilled;
          this.value = value;
          if (this.onFulfilledFns) {
            this.onFulfilledFns.forEach((item) => {
              item(value);
            });
          }
        });
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onfulfilledFn?: fnType, onRejectedFn?: fnType) {
    onRejectedFn =
      typeof onRejectedFn === 'function'
        ? onRejectedFn
        : (err) => {
            throw err;
          };
    onfulfilledFn =
      typeof onfulfilledFn === 'function'
        ? onfulfilledFn
        : (value) => {
            throw value;
          };
    return new JLPromise((res, rej) => {
      if (this.status === statusEnum.fulfilled) {
        try {
          const value = onfulfilledFn!(this.value);
          res(value);
        } catch (err) {
          rej(err);
        }
      }
      if (this.status === statusEnum.rejected) {
        try {
          const value = onRejectedFn!(this.reason);
          rej(value);
        } catch (err) {
          rej(err);
        }
      }
      if (this.status === statusEnum.pending) {
        this.onFulfilledFns.push((values) => {
          try {
            const value = onfulfilledFn!(values);
            res(value);
          } catch (error) {
            rej(error);
          }
        });
        this.onRejectedFns.push((reason) => {
          try {
            const value = onRejectedFn!(reason);
            rej(value);
          } catch (error) {
            rej(error);
          }
        });
      }
    });
  }
  catch(catchFn: fnType) {
    return this.then(undefined, catchFn);
  }
}

new JLPromise((res, rej) => {
  console.log(2131);
  setTimeout(() => {
    res(6512);
  });
})
  .then((res) => {
    console.log(res);
    return 321;
  })
  .then((res) => {
    console.log(res);
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
console.log(456);
setTimeout(() => {
  new JLPromise((res) => {
    console.log(456);
    res(666);
  }).then((res) => {
    console.log(res);
  });
});
