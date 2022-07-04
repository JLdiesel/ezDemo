// interface effectFn {
//   (): unknown;
//   deps: dep[];
//   options?: effectFnOptions;
// }
type effectFn = InstanceType<typeof ReactiveEffect> | null;
type fnType = () => unknown;
export let activeEffect: effectFn = null;
export function effect(fn: fnType) {
  const _effect = new ReactiveEffect(fn); //创建effect
  _effect.run(); //默认先执行一次
}

class ReactiveEffect {
  public parent: effectFn = null;
  //记录该副作用函数对应的key的Set集合，Set集合中会包含该副作用函数
  //如果要删除该副作用函数，只需要遍历deps，拿到set后delete自身
  //函数对应多少key，deps的长度就为多少
  deps: Set<effectFn>[] = [];
  // 表示在实例上新增了active属性
  active = true; //effect默认是激活状态
  constructor(public fn: fnType) {
    //用户传递的参数会放在this上
  }
  //执行effect
  run() {
    //如果是非激活的情况，只需要执行函数
    //不需要进行依赖收集
    if (!this.active) this.fn();
    //依赖收集
    try {
      //解决Effect嵌套问题
      //先把parent赋值为之前的activeEffect
      this.parent = activeEffect;
      activeEffect = this;
      return this.fn(); //当稍后调用取值操作的时候，就可以获取到这个全局的activeEffect了
    } finally {
      //在执行完这个函数收集完依赖之后把activeEffect赋值为parent
      activeEffect = this.parent;
      this.parent = null;
    }
  }
}
type TargetMap<T extends object> = WeakMap<T, Map<keyof T, Set<effectFn>>>;
const targetMap: TargetMap<any> = new WeakMap();
export function track<T>(target: T, type, key: keyof T) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target); //第一次没有
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  //避免重复收集
  let shouldTrack = !dep.has(activeEffect);
  if (shouldTrack) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep); //让effect记住对应的dep
  }
  //反向记录effect函数被哪些依赖收集了
}
export function tirgger<T>(
  target: T,
  type,
  key: keyof T,
  oldVal: T[keyof T],
  newVal: T[keyof T]
) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return; //触发的值没有副作用函数/模板中使用
  const effects = depsMap.get(key); //属性对应的effects
  effects &&
    effects.forEach((effectFn) => {
      effectFn!.run();
    });
}
