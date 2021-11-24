function* generator() {
  console.log('函数执行');
  let value = 100;
  console.log(value);
  yield 1;
  value = 200;
  console.log(value);
  yield 2;
  value = 300;
  console.log(value);
  yield 3;
  console.log('函数结束执行');
  return 123;
}
const gen = generator(); //什么都不打印
console.log(gen.next()); //执行第一个yield之前的代码
console.log(gen.next()); //2
console.log(gen.next()); //3
console.log(gen.next()); //执行4次，3个yield 所以结束执行
