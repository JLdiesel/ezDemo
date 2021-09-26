import React, { PureComponent } from 'react'
import UserContext from './context/UserContext'
import About from './components/About'
import Home from './components/Home'
export default class App extends PureComponent {
    render() {
        return (
            <div>
                <UserContext.Provider value={{ nickname: '金龙', level: 18, address: '中国' }}>
                    <Home name={"我"} age={18} />
                    <About name={"你"} age={19} />
                </UserContext.Provider>
            </div >
        )
    }
}
