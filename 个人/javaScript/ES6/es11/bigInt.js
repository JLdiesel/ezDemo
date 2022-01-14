let bignumber = 1231251251264512532645n;
// bignumber = bignumber + 21312;  报错 bigint不能与number类型相加，需要将number类型转换为bigint
bignumber = bignumber + BigInt(21312);
let smallNumber = Number(bignumber);
console.log(bignumber);
console.log(smallNumber);
