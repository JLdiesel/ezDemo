// Object.prototype.toString.call([value])
// 1调用[value][Symbol.toStringTag]
// 2调用[value]内置的[[class]]
class Fn{
 
}
Fn.prototype[Symbol.toStringTag]='Fn'
let f = new Fn;
console.log(Object.prototype.toString.call(f)); //"[object Fn]"