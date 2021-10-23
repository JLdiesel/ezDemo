function createObj(obj) {
    function Fn() { }
    Fn.prototype = obj
    return new Fn()
}
/**
 * 继承函数
 * @param {*} SubType 子类型
 * @param {*} SuperType 父类型
 */
function inheritPrototype(SubType,SuperType) {
  //把A置于B的原型链上并返回
  
  // SubType.prototype = Object.create(SuperType.prototype)

  // Polyfill
  SubType.prototype =createObj(SuperType.prototype)
  //添加constructor方法指向SubType
  Object.defineProperty(SubType.prototype, 'constructor', {
    enumerable: false,
    configurable: true,
    writable: true,
    value:SubType
})
}
// Student.prototype = Object.create(Person.prototype)
// //添加constructor方法指向SubType
// Object.defineProperty(Student.prototype, 'constructor', {
//   enumerable: false,
//   configurable: true,
//   writable: true,
//   value:SubType
// })
inheritPrototype(Student,Person)

function Person(name, age, friends) {
  this.name = name;
  this.age = age;
  this.friends=friends
}
Person.prototype.running=function () {
  console.log(`${this.name}is running`);
}
function Student(name, age, friends, sno, score) {
  Person.call(this, name, age, friends);
  this.sno = sno;
  this.score=score
}


// Student { name: 'lyj', age: 18, friends: [ 'jl' ], sno: 1, score: 100 }
Student.prototype.studying=function () {
   console.log(`${this.name}is studying`);
}
const stu = new Student('lyj', 18, ['jl'], 1, 100);
console.log(stu);
//Person { name: 'lyj', age: 18, friends: [ 'jl' ], sno: 1, score: 100 }
