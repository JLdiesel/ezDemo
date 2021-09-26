import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react'
function FacyInput(props, ref) {
    //自定义暴露某些事件给父组件而不是全部暴露
    const inputRef = useRef();
    const [counter, setCounter] = useState(0)
    props.getCounter(counter)
    useImperativeHandle(
        ref,
        () => ({
            focus: () => {
                inputRef.current.focus();
            },
            increment: () => {
                setCounter(counter + 10)
            }
        }),
    )
    return (
        <div><input ref={inputRef} />
            <h2>{counter}</h2></div>
    )
}
export default function Focus() {
    let counters
    const inputRef = useRef();
    FacyInput = forwardRef(FacyInput);
    function focu() {
        inputRef.current.focus()
    }
    function getCounter(counter) {
        counters = counter
        console.log(this);
    }
    function increment() {
        inputRef.current.increment()
    }
    return (
        <div>
            <FacyInput ref={inputRef} getCounter={getCounter} />
            <h2>{counters}</h2>
            <button onClick={focu}>focus</button>
            <button onClick={increment} >+10</button>
        </div>
    )
}
