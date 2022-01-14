import React, { memo, useState, useEffect } from 'react'

export default function App() {
  const [count, setcount] = useState(0)
  function increment() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        setcount(count + 1);
        console.log(count);
      }, 0);
    }
  }
  function increment2() {
    document.getElementById('btns').addEventListener('click', () => {
      setcount((count) => count + 1);
      console.log(count);
    })
  }
  useEffect(() => {
    document.getElementById('btns').addEventListener('click', () => {
      setcount(count + 1);
      console.log(count);
    })
  }, [])
  return (
    <div>
      <button id='btns' >+1</button>
      <h1>{count}</h1>
    </div>
  )
}

