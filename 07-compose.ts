type Func<T extends any[], R> = (...a: T) => R;
function compose(): <T>(a: T) => T;
function compose<T extends Function>(func: T): T;
function compose<A, T extends any[], R>(
  func1: (a: A) => R,
  func2: Func<T, A>
): Func<T, R>;
function compose<A, B, C, T extends any[], R>(
  func1: (a: C) => R,
  func2: (a: B) => C,
  func3: (a: A) => B,
  func4: Func<T, A>
): Func<T, R>;
function compose<R>(
  f1: (a: any) => R,
  ...funcs: Function[]
): (...args: any[]) => R;
function compose<R>(...funcs: Function[]): (...args: any[]) => R;
function compose(...funcs: Function[]) {
  if (funcs.length === 0) return <T>(arg: T): T => arg;
  if (funcs.length === 1) return funcs[0];
  return funcs.reduce(
    (a, b) =>
      (...args: any) =>
        a(b(...args))
  );
}
function JLCompose(...fns: ((...args: any[]) => unknown)[]) {
  const length = fns.length;
  function compose(...args: any[]) {
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
function double(m: number) {
  return m * 2;
}
function add(n: number) {
  return n + 2;
}
//把两个函数合并
const compareFoo = JLCompose(double, add);
const compare = compose(double, add);
console.log(compareFoo(22));
console.log(compare(22));
export {};
