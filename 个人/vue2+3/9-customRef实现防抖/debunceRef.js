import { customRef } from 'vue';
export default function (value, delay = 200) {
  let timer = null;
  //调用track决定什么时候收集依赖
  //调用trigger决定什么时候更新依赖
  return customRef((track, trigger) => ({
    get() {
      track();
      return value;
    },
    set(newvalue) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        value = newvalue;
        trigger();
      }, delay);
    },
  }));
}
