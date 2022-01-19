function test(a, b) {
  console.log(a); //1
  console.log(b); //funb
  var a = 123;
  console.log(a); //123
  console.log(c); //func
  var c;
  b(); //funb

  function b() {
    console.log(b);
  }

  function c() {}
  console.log(e); //undefined
  var e = function e() {};
  console.log(e); //fune
}
test(1, 2);
