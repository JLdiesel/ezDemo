// 空值合并运算 ??
//如果前一个是undefined||null，则取后一个
//消除了||的弊端: 当前一个为0或为空字符串时，也会取后一个
let abc = 0;
let cba = 2;
let bar = '';
let foo = abc ?? 1;
let foo1 = abc || 1;
let foo2 = cba ?? 1;
let foo3 = bar ?? 1;

console.log(foo); //0
console.log(foo1); //1
console.log(foo2); //2
console.log(foo3); //''
