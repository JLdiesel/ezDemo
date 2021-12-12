var x = 0;
function foo(x = 4, y = function () {
  x = 3;
  console.log(x);//3
}) {
  console.log(x);//4
  var x = 2;
  y();
  console.log(x);//2
}
foo()
console.log(x);//0
