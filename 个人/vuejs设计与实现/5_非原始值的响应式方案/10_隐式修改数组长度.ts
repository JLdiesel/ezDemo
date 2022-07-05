import { effect } from '../4_响应系统的作用与实现/8_计算属性与lazy';
import { reactive } from './9_查找数组';
const arrayInstrumentations = {};

/* 
当调用数组的push方法时，既会读取length，又会设置length
*/
const arr = reactive([]);
effect(() => {
  arr.push(1);
});
effect(() => {
  arr.push(1); //会死循环
  /* 
    push方法的调用会简介读取length属性
  */
});
let shouldTrack = true;
['push'].forEach((method) => {
  //获取原始push方法
  const originMethod = Array.prototype[method];
  //重写
  arrayInstrumentations[method] = function (...args) {
    //在调用原始方法之前，禁止追踪
    shouldTrack = false;
    //push方法的默认行为
    let res = originMethod.apply(this, args);
    //在调用原始方法后，恢复原来的行为，即允许追踪
    shouldTrack = true;
    return res;
  };
});
