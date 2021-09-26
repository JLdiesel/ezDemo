import React, { PureComponent } from 'react'
import { DivStyle, DiyInput } from './homeStyle'
export default class Home extends PureComponent {
    state = { color: 'skyblue' }
    render() {
        return (
            <>
                <DivStyle>你才是
                 <span>猪</span>

                    <span className='you'>猪</span>
                    <span>猪</span>
                </DivStyle>
                <DiyInput color={this.state.color} />
            </>
        )
    }
}
