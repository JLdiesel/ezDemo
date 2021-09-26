import React, { PureComponent } from 'react'
import enProps from '../common/enProps'
class Home extends PureComponent {
    render() {
        console.log(this.props);

        return (
            <div>
                <ul>
                    <li>{this.props.nickname}</li>
                    <li>{this.props.level}</li>
                    <li>{this.props.address}</li>
                </ul>
            </div>
        )
    }
}
export default enProps(Home)
