function Student(name, age) {
  this.name = name;
  this.age = age;
}
function Teacher(params) {}

const stu = new Student('jl', 18);
console.log(stu); //Student { name: 'jl', age: 18 }
console.log(stu.__proto__ === Student.prototype); //true
const teacher = Reflect.construct(Student, ['jl', 18], Teacher);
console.log(teacher); //Teacher { name: 'jl', age: 18 }
