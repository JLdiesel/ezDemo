setTimeout(() => {
  console.log('setTimeout');
}, 1000);
setTimeout(() => {
  console.log('setTimeout');
}); //队列3
queueMicrotask(() => {
  console.log('queueMicrotask');
}); //队列2
Promise.resolve().then(() => {
  console.log('promise then');
}); //队列2
process.nextTick(() => {
  console.log('process');
}); //队列1
setImmediate(() => {
  console.log('imm');
}); //队列4
console.log(123); //同步队列
