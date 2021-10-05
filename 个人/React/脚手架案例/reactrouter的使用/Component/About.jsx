import React, { PureComponent } from 'react'

export default class About extends PureComponent {
    componentDidMount() {
        console.log(this.props.location);
    }
    render() {
        return (
            <div>
                about??????????123
            </div>
        )
    }
}
