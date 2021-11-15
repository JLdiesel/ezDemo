// console.log(global);
// console.log(window);
console.log(globalThis); //在不同的环境下指向的东西不同 node下为global，浏览器中为window

const obj = {
  name: 'jl',
  age: 18,
};
for (const item in obj) {
  console.log(item);
}
