// const obj = {
//   name:'jl'
// }
//对象里有一个__proto__对象：隐式原型对象

// Foo是一个函数  有显示原型Foo.prototype
//Foo.prototype是一个对象，有隐式原型 Foo.prototype.__proto__===Object.prototype
//创建一个函数的同时 Foo.prototype={constructor:Foo }

// Foo是一个对象，有隐式原型Foo.__proto__===Function.prototype
// Foo.__proto__=Function.prototype={constructor:Function }

// Foo的prototype指向它的原型对象{constructor:Foo}，原型对象的constructor指向Foo函数本身
console.log(Foo === Foo.prototype.constructor);//true
console.log(Foo.prototype.__proto__ === Object.prototype);//true
console.log(Foo.__proto__ === Function.prototype);//true
console.log(Foo.prototype===Foo.__proto__); //false
console.log(Foo.prototype.constructor); //[Function: Foo]
console.log(Foo.__proto__.constructor); //[Function: Function]

console.log(Object.prototype);//[Object: null prototype] {}
console.log(Object.prototype.__proto__===null);//true
console.log(Object.__proto__ === Function.prototype);//true
console.log(Object.__proto__.__proto__ === Object.prototype);//true

console.log(Function.__proto__ !== Object.prototype);//true
//Function的__proto__指向Function.prototype
console.log(Function.__proto__ === Function.prototype);//true

console.log(Function.prototype.__proto__===Object.prototype);//true

// Foo函数的__proto__指向Function的原型对象{constructor:Function}
// Function函数的__proto__指向Function的原型对象{constructor:Function}
// Object函数的__proto__指向Function的原型对象{constructor:Function}

//总结：1.所有函数的__proto__指向Function的原型对象{constructor:Function}
//2.所有函数的prototype.__proto__(原型对象的隐式原型)指向Object.prototype
//3.所有对象(Object.prototype和实例对象除外)的__proto__(隐式原型)指向Object.prototype
//4.Object.prototype的__proto__指向Null
//5.实例对象的__proto__属性，指向其构造函数的prototype
function Foo() {
  
}
const foo = new Foo()
//foo是一个实例对象  有__proto__属性，指向Foo函数的prototype
console.log(foo.__proto__ === Foo.prototype); //true  
//Foo.prototype是一个对象 由Object创建  所以Foo.prototype.__proto__指向Object.prototype
console.log(Foo.prototype.__proto__===Object.prototype); //true  
const obj = new Object()
console.log(obj.__proto__ === Object.prototype);//true