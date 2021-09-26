import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increament, decreament, asyncIncreament } from '../redux/actions/count'
class Count extends Component {
    increment = () => {
        const value = this.collet.value
        this.props.add(value * 1)
    }
    decrement = () => {
        const value = this.collet.value
        this.props.jian(value * 1)
    }
    incrementIfOdd = () => {
        const value = this.collet.value
        if (this.props.count % 2 !== 0) {
            this.props.add(value * 1)
        }
    }
    asyncIncrement = () => {
        const value = this.collet.value
        this.props.async(value * 1)
    }
    render() {
        return (
            <div>
                <h1>当前求和为{this.props.count}</h1>
                <select ref={a => this.collet = a}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>加</button>&nbsp;
                <button onClick={this.decrement}>减</button>&nbsp;
                <button onClick={this.incrementIfOdd}>奇数加</button>&nbsp;
                <button onClick={this.asyncIncrement}>异步加</button>
            </div>
        )
    }
}

export default connect(
    state => ({ count: state.count })
    , {
        add: increament,
        jian: decreament,
        async: asyncIncreament
    })(Count)
