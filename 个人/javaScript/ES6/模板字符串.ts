let a = 6;
let b = 9;
function zipTag(strings: TemplateStringsArray, ...expressions: number[]) {
  console.log(strings); //[ '', ' + ', ' = ', '' ]
  console.log(expressions); //[ 6, 9, 15 ]
  return expressions.map((e, i) => `${e}${strings[i + 1]}`).join('');
}
let untaggedResult = `${a} + ${b} = ${a + b}`;
let taggedResult = zipTag`${a} + ${b} = ${a + b}`;
console.log(untaggedResult); // "6 + 9 = 15"
console.log(taggedResult); // "6 + 9 = 15"
console.log(String.raw`first line
second line`);
// first line
// second line
console.log(`\u00A9`); // ©
console.log(String.raw`\u00A9`); // \u00A9
// 换行符示例
console.log(`first line\nsecond line`);
// first line
// second line
console.log(String.raw`first line\nsecond line`); // "first line\nsecond line"
// 对实际的换行符来说是不行的
// 它们不会被转换成转义序列的形式
console.log(`first line 
second line`);
// first line
// second line
function printRaw(strings: TemplateStringsArray, ...expressions: string[]) {
  console.log('Actual characters:');
  console.log(strings);

  for (const string of strings) {
    console.log(string);
  }
  console.log('Escaped characters;');
  for (const rawString of strings.raw) {
    console.log(rawString);
  }
}
printRaw`\u00A9${'and'}\n`;
export {};
