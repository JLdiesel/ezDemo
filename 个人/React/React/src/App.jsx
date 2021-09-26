
import React, { useState, useEffect } from 'react'
import Count from './count'
import Focus from './Focus'
import GetInput from './GetInput'
export default function App() {
    const [isShow, setIsShow] = useState(true)
    function change() {
        setIsShow(!isShow)
    }
    function getValue(e) {
        console.log(e.target.value);
    }
    return (
        <div>
            <input type='text' onChange={getValue} />
            <Focus />
            <GetInput />
            {isShow && <Count />}
            <button onClick={change}>显示/隐藏</button>
        </div>
    )
}
