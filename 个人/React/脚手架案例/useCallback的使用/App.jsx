import React, { memo, useCallback, useState } from 'react';
const JLButton = memo((props) => {
  console.log(props.title);
  return <button onClick={props.increment}>+1</button>;
});
//没有性能优化
export default function App() {
  const [count, setcount] = useState(0);
  const [login, setLogin] = useState(false);
  //如果传给子组件函数让子组件回调的话，需要通过useCallback优化，防止组件重新渲染   子组件需要包裹memo

  const increment = () => {
    setcount(count + 1);
  };
  const inc2 = useCallback(() => {
    setcount(count + 1);
  }, [count]);
  return (
    <div>
      <h2>{count}</h2>
      <h2>{login}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={() => setLogin(!login)}>+fff</button>
      <button onClick={inc2}>+1</button>
      <JLButton increment={increment} title="btn1" />
      <JLButton increment={inc2} title="btn2" />
    </div>
  );
}
