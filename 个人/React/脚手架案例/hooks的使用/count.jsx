import React, { useState, useEffect, useRef } from 'react'

export default function Count() {
    const [count, setCount] = useState(0)
    const countRef = useRef(count)
    useEffect(() => {
        console.log('123');
        countRef.current = count
        let asyncAdd = setTimeout(() => {
            setCount(count + 1)
        }, 1000);
        return () => {
            console.log(123);
            clearTimeout(asyncAdd)
        }
    }, [count])

    function increment() {
        setCount(count + 1)
    }
    return (
        <div>
            <h2>之前计数为{countRef.current}</h2>
            <h2>当前计数为{count}</h2>
            <button onClick={increment}>+1</button>
        </div>
    )
}
