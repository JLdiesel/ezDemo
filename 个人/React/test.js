// let a = 6
// let b = 9

// function test(string, ...exp) {
//     console.log(exp.map((e, i) => `${e}${string[i+1]}`).join(''));
//     return exp.map((e, i) => `${e}${string[i+1]}`).join('')
// }

// let c = `${a}+${b}=${a + b}`
// let d = test `${a}+${b}=${a + b}`;
// console.log(c);
// console.log(d);
function demo() {
    a();
}
function a() {
    console.log(this);
}
demo()
const x = demo
x()
class Test{
    demo2() {
        console.log(this);
    }
}
const test = new Test
test.demo2()
const y = test.demo2
y()