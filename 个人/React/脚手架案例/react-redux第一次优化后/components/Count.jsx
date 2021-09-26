import React, { Component } from 'react'
export default class Count extends Component {

    //加法
    increment = () => {
        const { value } = this.selectNumber
        const { jia } = this.props
        jia(value * 1)
    }
    //减法
    decrement = () => {
        const { value } = this.selectNumber
        this.props.jian(value * 1)
    }
    //奇数加法
    incrementIfOdd = () => {
        const { value } = this.selectNumber
        if (this.props.count % 2 !== 0) {
            this.props.jia(value * 1)

        }

    }
    //异步加法
    incrementAsync = () => {
        const { value } = this.selectNumber
        this.props.Async(value * 1, 1000)



    }
    render() {
        console.log(this.props);
        const { count } = this.props
        return (
            <div>
                <h1>当前求和为:{count}</h1>
                <select ref={c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>当前求和为奇数时+</button>&nbsp;
                <button onClick={this.incrementAsync}>异步相加</button>
            </div>
        )
    }
}
