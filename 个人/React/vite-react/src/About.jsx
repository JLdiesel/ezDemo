import React from 'react'

export default function About(props) {
    function changeName() {
        props.changeName('二流子')
    }
    return (
        <div>
            我叫刘德华
            <button onClick={changeName}>改名</button>
        </div>
    )
}
