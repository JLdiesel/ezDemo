function randomHexColor() {
  return (
    '#' + ('0000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
  );
}
document.body.innerHTML =
  "<h3 id='aside'>点击按钮将立即生成元素</h3><input/><br><br><button id='button'>button</button> <div id='root'></div>";
document.getElementById('button').onclick = () => {
  document.getElementById('aside').innerHTML = '页面立即恢复';
  const root = document.getElementById('root');
  function loop(n) {
    let k = 0;
    for (let i = 0; i < 100; i++) {
      k += new Date() - 0;
      let el = document.createElement('div');
      el.innerHTML = k;
      root.appendChild(el);
      el.style.cssText = `background:${randomHexColor()};height:40px`;
    }
    if (n) {
      setTimeout(() => {
        loop(n - 1);
      }, 40);
    }
  }
  loop(800);
};
