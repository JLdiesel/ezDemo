function debounce(fun, delay, immediate = false) {
  let timer;
  let isInvoke = false;
  function debounce(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate && !isInvoke) {
      fun.apply(this, ...args);
      isInvoke = true;
    } else {
      timer = setTimeout(() => {
        fun.apply(this, ...args);
        isInvoke = false;
      }, delay);
    }
  }
  return debounce;
}
