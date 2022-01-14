import React,{useContext} from 'react'
import {UserContext,NameContext} from './App'
export default function contextHookDemo() {
    const user = useContext(UserContext)
    const name = useContext(NameContext)
    return (
        <div>
        UserContextValue{user.name}
        NameContextValue{name.name}
        </div>
    )
}
