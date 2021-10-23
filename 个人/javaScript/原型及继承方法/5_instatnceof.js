function inheritPrototype(SubType,SuperType) {
  //把A置于B的原型链上并返回
  SubType.prototype = Object.create(SuperType.prototype)
  // Polyfill
  // SubType.prototype =createObj(SuperType.prototype)
  //添加constructor方法指向SubType
  Object.defineProperty(SubType.prototype, 'constructor', {
    enumerable: false,
    configurable: true,
    writable: true,
    value:SubType
})
}

function Animal() {
  
}
function Person() {
  
}
function Student() {
}
//把Animal设置到Person的原型链上
inheritPrototype(Person, Animal)
//把Person设置到Student的原型链上
inheritPrototype(Student, Person)

const stu = new Student()
const ps = new Person()

console.log(stu instanceof Person);// true
console.log(stu instanceof Student);// true
console.log(stu instanceof Animal);// true
console.log(Object.getPrototypeOf(stu)); //Person{}
console.log(Object.getPrototypeOf(ps)); //Animal{}
console.log(stu); //Student{}
console.log(stu instanceof Person);// true
console.log(stu instanceof Student);// true
console.log(stu instanceof Object);// true
