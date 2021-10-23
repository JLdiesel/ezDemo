/* 
：原理是这样的，
不同的对象在底层都表示为二进制，
在 JavaScript 中二进制前三位都为 0 的话会被判断为 object 类型，
null 的二进制表示是全 0，自然前三位也是 0，
所以执行 typeof 时会返回“object”。
*/

console.log(Object.prototype.toString.call('123'));
console.log(typeof null === 'object');
