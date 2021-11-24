class Classroom {
  constructor(address, name, students) {
    this.address = address;
    this.name = name;
    this.students = students;
  }
  entry(newStudent) {
    this.students.push(newStudent);
  }
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.students.length) {
          return { done: false, value: this.students[index++] };
        } else {
          return { done: true, value: undefined };
        }
      },
      return: () => {
        console.log('迭代器提前终止');
        return { done: true, value: undefined };
      },
    };
  }
}
const classroom = new Classroom('树人', '清乐', ['jl', 'lml', 'crc', 'hjl']);

for (const item of classroom) {
  console.log(item);
  if (item === 'crc') break;
}
