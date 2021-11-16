function foo() {}
const fooProxy = new Proxy(foo, {
  apply(target, thisArg, argArray) {
    console.log('调用apply');
    return target.apply(thisArg, argArray);
  },
  construct(target, argArray, newTarget) {
    console.log('调用cunstruct');
    return new target(...argArray);
  },
});
fooProxy.apply({}, ['abbc', 'cba']);
new fooProxy('abc', 'bcs');
