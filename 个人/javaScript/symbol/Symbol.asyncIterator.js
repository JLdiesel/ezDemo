/* 表示“一个方法，该方法返回对象默认的 AsyncIterator。由 for-await-of 语句使用”。
实现异步迭代器 API 的函数。
for-await-of 循环会利用这个函数执行异步迭代操作。循环时，它们会调用以 Symbol.asyncIterator
为键的函数，并期望这个函数会返回一个实现迭代器 API 的对象。很 */

class Emitter {
  constructor(max) {
    this.max = max;
    this.asyncIdx = 0;
  }
  async *[Symbol.asyncIterator]() {
    while (this.asyncIdx < this.max) {
      yield new Promise((resolve) => resolve(this.asyncIdx++));
    }
  }
}
async function asyncCount() {
  let emitter = new Emitter(5);
  for await (const x of emitter) {
    console.log(x);
  }
}
asyncCount();
// 0
// 1
// 2
// 3
// 4
