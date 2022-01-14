import React, { useMemo, useState } from 'react';
function calcNumber(count) {
  console.log('重新计算');
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += 1;
  }
  return total;
}
export default function App() {
  const [count, setcount] = useState(0);
  const [login, setLogin] = useState(false);
  //如果外部函数用了内部state变量，并且需要用到其返回值，可以用useMemo优化，减少外部函数调用
  const total = useMemo(() => calcNumber(count), [count]);
  const increment = () => {
    setcount(count + 1);
  };
  return (
    <div>
      <h2>计算数字的和{total}</h2>
      <h2>{count}</h2>
      <h2>{login}</h2>
      <button onClick={increment}>+1</button>
      {/* 点击这个不重新计算 */}
      <button onClick={() => setLogin(!login)}>+fff</button>
    </div>
  );
}
