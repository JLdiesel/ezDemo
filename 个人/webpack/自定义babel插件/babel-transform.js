const { transform } = require('@babel/core');
const myPlugin = require('./plugin');
const code1 = `var a = 1`;
// const code2=`var a = 1`
const code3 = `var func = ()=>{ console.log(this.b) };`;
const result1 = transform(code1, { babelrc: false, plugins: [myPlugin] });
// const result2 = transform(code2, { babelrc: false, plugins: [myPlugin] })
const result3 = transform(code3, { babelrc: false, plugins: [myPlugin] });
console.log(result1.code);
// console.log(result2.code);
console.log(result3.code);
