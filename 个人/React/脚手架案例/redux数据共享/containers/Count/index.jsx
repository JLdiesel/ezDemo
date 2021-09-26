import React, { Component } from 'react'
//引入connect用于连接UI组件与redux
import { connect } from 'react-redux'

import {
    createDecrementAction,
    createIncrementAction,
    createIncrementAsyncAction
} from '../../redux/actions/count'

class Count extends Component {

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

        const { count } = this.props
        return (
            <div>
                <h1>当前求和为:{count}</h1>
                <select ref={c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <ul>
                    {
                        this.props.person.map((p) => {
                            return <li key={p.id}>-- {p.name}--{p.age}</li>
                        })
                    }
                </ul>
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>当前求和为奇数时+</button>&nbsp;
                <button onClick={this.incrementAsync}>异步相加</button>
            </div>
        )
    }
}

//mapStateToProps函数返回一个对象
//返回对象中的key作为传递给UI组件props的key
//value为props的value - 状态

//a函数返回一个对象
//中的key作为传递给UI组件props的key,
//value为props的value - 方法


//使用connect()()创建并暴露一个Count的容器组件
export default connect(
    state => ({
        count: state.count,
        person: state.person
    }),
    //mapDispatchToPorps的一般写法
    /*     dispatch => ({
            //通知redux执行加法
            jia: number => dispatch(createIncrementAction(number)),
            jian: number => dispatch(createDecrementAction(number)),
            Async: (number, time) => dispatch(createIncrementAsyncAction(number, time))
        }) */
    //精简写法
    {
        jia: createIncrementAction,
        jian: createDecrementAction,
        Async: createIncrementAsyncAction
    }
)(Count)
