import React, { PureComponent } from 'react'

export default class Home extends PureComponent {
    state = { myname: '金龙', mycount: 5 }
    changecount = () => {
        this.props.add((count) => {
            this.setState({ mycount: count })
        })
    }
    render() {
        return (
            <div>
                {this.state.mycount}
                {/* {this.state.myname} */}
                <button onClick={this.transform}>传功</button>
            </div>
        )
    }
}
