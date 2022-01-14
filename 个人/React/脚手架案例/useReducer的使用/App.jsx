import React, { memo, useReducer } from 'react';
//纯函数
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    default:
      break;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
      <h2>{state.count}</h2>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
    </div>
  );
}
