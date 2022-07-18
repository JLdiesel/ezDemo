function JLCompose(...fns:((...args:any[])=>unknown)[]) {
    const length=fns.length
  function compose(...args:any[]) {
    let index = 0;
    console.log(this);
    let result = length ? fns[index].apply(this, args) : args;
    while (++index < length) {
      result = fns[index].call(this, result);
    }
    return result;
  }
  return compose;
}
function double(m:number) {
  return m*2
}
function add(n:number) {
  return n+2
}
//把两个函数合并
const compareFoo = JLCompose(double, add)
console.log(compareFoo(22));
