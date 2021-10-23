const personObj = {
  runnning: function () {
    console.log('running');
  }
}
const stuObj = Object.create(personObj)
//如果创建很多个对象并且需要拓展对象的属性
//则会有很多重复代码
stuObj.name = 'lyj';
stuObj.studying = function () {
  
}
//使用工厂函数 把属性和方法寄生到创建出来的对象中
//使得所有通过函数创建出来的对象都拥有某些属性
function createStudent(name) {
  const stu = Object.create(personObj);
  stu.name = name;
  //弊端:每次创建student时都会创建一个studying函数
  stu.studying = function () {
    console.log('studying');
  }
  return stu
}
const info = createStudent('lyj')
console.log(info);
//{ name: 'lyj', studying: [Function (anonymous)] } 
//弊端2：没有显示这是一个student对象