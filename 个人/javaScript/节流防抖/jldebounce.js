/**
 *
 * @param {*} fun 执行函数
 * @param {*} delay 延迟时间
 * @param {*} immediate 立即执行
 * @returns
 */
function debounce(fun, delay, immediate = false) {
  let timer;
  let isInvoke = false;
  function _debounce(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate && !isInvoke) {
      fun.apply(this, ...args);
      isInvoke = true;
    } else {
      timer = setTimeout(() => {
        fun.apply(this, ...args);
        init();
      }, delay);
    }
  }
  _debounce.cancel = function () {
    if (timer) {
      clearTimeout(timer);
    }
    init();
  };
  function init() {
    timer = null;
    isInvoke = false;
  }
  return _debounce;
}
