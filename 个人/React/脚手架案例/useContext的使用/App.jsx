import React, { useState, createContext } from 'react'
import Count from './count'
export const UserContext=createContext();
export const NameContext=createContext();
export default function App() {
  
    return (
        <UserContext.Provider value={{name:'jl',age:22}} >
            <NameContext.Provider value={{name:'lyj',age:22}}><Count/></NameContext.Provider>
           
        </UserContext.Provider>
    )
}
