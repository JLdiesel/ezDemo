//借用构造函数继承
function Person(name, age,friends) {
    this.name=name;
    this.age = age;
    this.friends=friends
}
Person.prototype.eating=function() {
    console.log(this.name+'正在吃饭');
}
//构造函数继承
function Student(name,age,friends,sno) {
    Person.call(this,name,age,friends) 
    this.sno=sno
}
const p = new Person()
//原型链继承  缺点，new Person时会在person上多出值为undefined的属性，浪费内存
Student.prototype=p;
Student.prototype.study=function () {
    console.log(this.name+'正在学习');
}


const stu1=new Student('金龙','18',['kobe'],66)
console.log(stu1);
console.log(stu1 instanceof Person);
stu1.study();
stu1.eating()
