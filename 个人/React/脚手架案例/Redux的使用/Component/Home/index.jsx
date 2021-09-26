import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { increment, decrement, asyncIncrement } from '../../redux/actions/countAction'
class Home extends PureComponent {
    add = () => {
        this.props.increment(1)
    }
    decrements = () => {
        this.props.decrement(1)
    }
    asyncAdd = () => {
        this.props.asyncIncrement(1, 2000)
    }
    render() {
        console.log(this.state);
        console.log(this.props);
        return (
            <div>
                <h2>当前计数为{this.props.count}</h2>
                <button onClick={this.add}>+1</button>
                <button onClick={this.decrements}>-1</button>
                <button onClick={this.asyncAdd}>异步+1</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    count: state.count
})
// const mapDispatchToProps = dispatch => {
//     return {
//         increment: function () {
//             dispatch(increment)
//         }
//     }
// }

const mapDispatchToProps = {
    increment,
    decrement,
    asyncIncrement
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
