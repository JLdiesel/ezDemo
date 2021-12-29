/**
 *
 * @param {*} options leading:第一次是否需要请求  trailing:触发完后输入是否需要继续请求一次
 * @returns
 */
function throttle(fn, interval, options = { leading: true, trailing: false }) {
  const { leading, trailing } = options;
  //上一次开始时间
  let lastTime = 0;
  let timmer = null;
  function _throttle(...args) {
    //当前触发时间
    const nowTime = new Date().getTime();
    //如果不需要第一次执行，则不执行，如果trailing=true直接进入settimeout，否则就不执行；
    if (!lastTime && !leading) lastTime = nowTime;
    //距离上次开始时间是否经历了interval秒
    const remainTime = interval - (nowTime - lastTime);
    if (remainTime <= 0) {
      if (timmer) {
        clearTimeout(timmer);
        timmer = null;
      }
      fn.apply(this, args);
      //保留上次触发时间
      lastTime = nowTime;
      return;
    }

    if (trailing && timmer) {
      timmer = setTimeout(() => {
        timmer = null;
        lastTime = !leading ? 0 : new Date().getTime();
        fn.apply(this, args);
      }, remainTime);
    }
  }
  _throttle.cancel = function () {
    if (timmer) clearTimeout(timmer);
    lastTime = 0;
    timmer = null;
  };
  return _throttle;
}
