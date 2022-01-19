const s1 = Symbol('foo');
const s2 = Symbol('foo');
console.log(s1 === s2); //false
const s3 = Symbol.for('foo');
const s4 = Symbol.for('foo');
console.log(s3 === s4); //true
const foo = {
  [s1]: 'foo s1',
};
foo[s2] = 'foo s2';
console.log(foo);
