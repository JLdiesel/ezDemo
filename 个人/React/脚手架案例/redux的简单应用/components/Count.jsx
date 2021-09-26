import React, { Component } from 'react'
import store from '../redux/store'
export default class Count extends Component {

  /*   componentDidMount() {
        //检测redux中状态的变化
        store.subscribe(() => {
            this.setState({})
        })
    } */
    //加法
    increment = () => {
        const { value } = this.selectNumber
        store.dispatch({
            type: 'increment',
            data: value * 1
        })

    }
    //减法
    decrement = () => {
        const { value } = this.selectNumber
        store.dispatch({
            type: 'decrement',
            data: value * 1
        })
    }
    //奇数加法
    incrementIfOdd = () => {
        const { value } = this.selectNumber
        const count = store.getState()
        if (count % 2 != 0) {
            store.dispatch({
                type: 'increment',
                data: value * 1
            })
        }
    }
    //异步加法
    incrementAsync = () => {
        const { value } = this.selectNumber
        setTimeout(() => {
            store.dispatch({
                type: 'increment',
                data: value * 1
            })
        }, 2000);

    }
    render() {
        console.log(store);
        return (
            <div>
                <h1>当前求和为:{store.getState()}</h1>
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
