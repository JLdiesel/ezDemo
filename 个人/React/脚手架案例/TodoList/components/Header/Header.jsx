import React, { Component } from 'react'
//引入proptypes对props类型进行限制
import propTypes from 'prop-types'
import { nanoid } from 'nanoid'
import './index.css'

export default class Header extends Component {
    //对接收的props进行 类型，必要性的限制
    static propTypes = {
        addTodo: propTypes.func.isRequired
    }
    //在input中按下按键触发函数  
    handleKeyUp = (event) => {

        const { keyCode, target } = event
        //判断是否按下回车 如果不是回车则直接return
        if (keyCode != 13) return
        if (target.value.trim() === '') {
            alert('输入不能为空')
            return
        }
        //使用props中的addTodo方法并传入一个新的state.todos内容
        const newItem = { id: nanoid(), name: target.value, done: false }
        this.props.addTodo(newItem)
        target.value = ''
    }
    render() {
        return (
            <div className="todo-header">
                <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认" />
            </div>
        )
    }
}
