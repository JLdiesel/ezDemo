import React, { memo, useMemo, useState } from 'react';
const JLInfo = memo((props) => {
  console.log('渲染了');
  return (
    <div>
      名字{props.name} 年龄{props.age}
    </div>
  );
});
export default function App() {
  const [show, setshow] = useState(false);
  //如果需要给子组件传递非state对象 可以通过useMemo进行优化
  const info = useMemo(() => ({ name: 'jl', age: 19 }), []);
  return (
    <div>
      {show ? '1' : '2'}
      <button onClick={() => setshow(!show)}>show</button>
      <JLInfo {...info} />
    </div>
  );
}
