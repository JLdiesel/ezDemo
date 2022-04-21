import React, { useState } from 'react'
function Home() {
    const [myname,setMyname]=useState('金龙')
    function changeName() {
        setMyname('物联网')
    }
    return (
        <div>
            {myname}
            <button onClick={changeName}>传功</button>
        </div>
    )
}
