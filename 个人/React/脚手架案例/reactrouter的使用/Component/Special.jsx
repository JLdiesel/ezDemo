import React, { PureComponent } from 'react'

export default class Special extends PureComponent {

    render() {
        const location = this.props.location
        console.log(location);

        return (
            <div>
                特色
                <ul>
                    <li>{location.state.name}</li>
                    <li>{location.state.age}</li>
                </ul>
            </div>
        )
    }
}
