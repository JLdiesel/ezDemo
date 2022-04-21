interface effectFn {
  (): void;
  deps: Set<() => void>[];
}
let activeEffect: {
  (): void;
  deps: Set<() => void>[];
} | null;
//利用栈,在副作用函数执行时入栈，执行完毕后出栈，并始终让activeEffect指向栈顶的副作用函数
//一个响应式数据只会收集直接读取其值的副作用函数，而不会影响外层的依赖收集
const effectStack = [];
function effect(fn: () => void) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    //在调用副作用函数之前把当前副作用函数压入栈中
    effectStack.push(effectFn)
    fn();
    //在当前副作用函数执行完毕后，把当前副作用函数出栈，并把activeEffect还原为之前的值
    effectStack.pop()
    
    activeEffect = effectStack[effectStack.length-1];
  };
  effectFn.deps = new Array<Set<() => void>>();
  effectFn();
}


export{}