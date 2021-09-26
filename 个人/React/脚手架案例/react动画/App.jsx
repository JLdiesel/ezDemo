import React, { PureComponent } from 'react'
import CSSTransitionDemo from './transition/CSSTransitionDemo'
import 'antd/dist/antd.css'
export default class App extends PureComponent {



    render() {
        return (
            <div>

                <CSSTransitionDemo />
            </div >
        )
    }
}
