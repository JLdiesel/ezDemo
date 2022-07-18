const promise1 = new Promise(res => {
  res(1)
})
const promise2 = new Promise(res => {
  res(2)
})
const promise3 = new Promise(res => {
  res(3)
})
const promises=[promise1,promise2,promise3]
async function foo() {
  for await (const item of promises) {
    console.log(item);
}
}
foo()