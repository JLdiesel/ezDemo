class Person{
  //1.在内存中创建一个对象moni={};
  //2.将类的原型prototype赋值给创建出来的对象 moni.__proto__=Person.prototype
  //3.将对象赋值给函数的this:new绑定 this=moni;
  //4.执行函数体中的代码
  //5.自动返回创建出来的对象
  constructor(name, age) {
    
    this._name = name;
    this.age=age
  }
  //实例方法
  running() {
    console.log(this.name+' running');
  }
  //访问器方法
  get name() {
    return this._name
  }
  set name(value) {
    this._name=value
  }
  //类的静态方法
  //Person.
  static age() {
    console.log('123');
  }
   static personStatic() {
    console.log('personStatic');
  }

}
class Student extends Person{
  constructor(name, age, sno) {
    //调用父类的constructor方法
      super(name,age);
      this.sno=sno
  }
  running() {
    //使用super调用父类的方法

    super.running();
    console.log('我是学生');
  }
}
Person.age() //123
// Person.running() // Person.running is not a function

console.log(Person.prototype);//{}
console.log(Person.prototype.constructor);//[class Person]
console.log(Person.prototype.__proto__);//[Object: null prototype] {}
console.log(typeof Person);//function
const p = new Person('jl',18);
console.log(p.name); //jl
const stu=new Student('lyj',18,1)
stu.running()
/* 
    lyj running
    我是学生
*/
Student.personStatic()
console.log(p.__proto__ === Person.prototype);//true
console.log(Object.getOwnPropertyDescriptors(Person.prototype));
/* 
{
  constructor: {
    value: [class Person],
    writable: true,
    enumerable: false,
    configurable: true
  },
  running: {
    value: [Function: running],
    writable: true,
    enumerable: false,
    configurable: true
  }
} */