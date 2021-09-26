import React, { PureComponent } from 'react'
import About from './components/About'
import Home from './components/Home'
export default class App extends PureComponent {
    render() {
        return (
            <div>
                <About />
                <Home />
            </div >
        )
    }
}
