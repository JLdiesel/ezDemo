import React, { useState, useEffect } from 'react'
import Count from './count'
export default function App() {
    const [isShow, setIsShow] = useState(true)
    function change() {
        setIsShow(!isShow)
    }
    return (
        <div>
            {isShow && <Count />}
            <button onClick={change}>显示/隐藏</button>
        </div>
    )
}
