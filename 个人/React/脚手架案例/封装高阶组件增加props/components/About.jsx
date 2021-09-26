import React, { PureComponent } from 'react'
import enProps from '../common/enProps'
class About extends PureComponent {
    render() {
        console.log(this.props);
        return (
            <div>
                <p>我叫{this.props.nickname}</p>
                <p>我{this.props.level}级了</p>
                <p>我住在{this.props.address}</p>
            </div>
        )
    }
}
export default enProps(About)