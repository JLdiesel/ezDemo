function A() {
  this.name = 'A';
  this.say = function () {
    console.log(this.name);
  }
}
A.prototype.look = function () {
  console.log('A look');
}
function Dog() {
  this.name='dog'
}
Dog.prototype = Object.create(A.prototype)
let dog = new Dog()
dog.look()
console.log(Object.getOwnPropertyDescriptors(A.prototype));