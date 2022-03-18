type extectorType = (
  resolve: (value: unknown) => void,
  reject: (reason?: any) => void
) => void;
enum statusEnum {
  pending,
  fulfilled,
  rejected,
}
class JLPromise {
  status: statusEnum;
  value: unknown;
  reason: unknown;
  onFulfilledFns: null | ((value: unknown) => void);
  onRejectedFns: null | ((reason: unknown) => void);
  constructor(executor: extectorType) {
    this.status = statusEnum.pending;
    this.onFulfilledFns = null;
    this.onRejectedFns = null;
    const reject = (error: unknown): void => {
      if (this.status === statusEnum.pending) {
        queueMicrotask(() => {
          this.status = statusEnum.rejected;
          this.reason = error;
          if (this.onRejectedFns) {
            this.onRejectedFns(error);
          }
        });
      }
    };
    const resolve = (value: unknown): void => {
      if (this.status === statusEnum.pending) {
        queueMicrotask(() => {
          this.status = statusEnum.fulfilled;
          this.value = value;
          if (this.onFulfilledFns) {
            this.onFulfilledFns(value);
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
  then(
    onfulfilledFn?: (value: unknown) => void,
    onRejectedFn?: (value: unknown) => void
  ) {
    return new JLPromise((res, rej) => {
      if (this.status === statusEnum.fulfilled) {
        if (onfulfilledFn) {
          try {
            const value = onfulfilledFn(this.value);
            res(value);
          } catch (err) {
            rej(err);
          }
        }
      }
      if (this.status === statusEnum.rejected) {
        if (onRejectedFn) {
          try {
            const value = onRejectedFn(this.reason);
            res(value);
          } catch (err) {
            rej(err);
          }
        }
      }
      if (this.status === statusEnum.pending) {
        if (onfulfilledFn) {
          this.onFulfilledFns = (values) => {
            const value = onfulfilledFn(values);
            res(value);
          };
        }

        if (onRejectedFn) {
          this.onRejectedFns = (reason) => {
            const value = onRejectedFn(reason);
            rej(value);
          };
        }
      }
    });
  }
  catch(catchFn: (err: unknown) => void) {
    return this.then(undefined, catchFn);
  }
}

const promise = new JLPromise((res, rej) => {
  console.log(2131);
  rej(123);
})
  .then((res) => {
    console.log(res);
    return 321;
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
console.log(456);
