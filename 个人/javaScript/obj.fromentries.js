const arr=[['name','jl'],['age',18]]

const arr2=Object.fromEntries(arr);
const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
const obj = Object.fromEntries(map);
const object1 = { a: 1, b: 2, c: 3 };
const object2 = Object.fromEntries(
  Object.entries(object1)
  .map(([ key, val ]) => [ key, val * 2 ])
);
console.log(object2);// { a: 2, b: 4, c: 6 }
console.log(obj); // { foo: "bar", baz: 42 }
console.log(arr2); //{ name: 'jl', age: 18 }
// console.log(arr);