//1 ||=逻辑或赋值运算
let message;
let abc = 1; //弊端:0或空字符串时还是会取后一个
message = abc ||= 'default Value';

//2 &&= 逻辑与赋值运算
let info = {
  name: 'jl',
};
let obj = 1;
obj &&= info.name;
obj &&= obj.name;
console.log(obj);
console.log(message);
//3 ||=逻辑或赋值运算
let message1;
let cba = 0; //没有逻辑或的弊端
let aaa = ''; //没有逻辑或的弊端
message1 = cba ??= 'default Value';
message = aaa ??= 'default Value';
console.log(message1); // 0
console.log(message); // ''
