import React, { PureComponent } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

export default class SwitchTransitionDemo extends PureComponent {
    
    render() {
        return (
            <div>
                <SwitchTransition>
                    <CSSTransition>
                        <button>on</button>
                    </CSSTransition>
                </SwitchTransition>
            </div>
        )
    }
}
