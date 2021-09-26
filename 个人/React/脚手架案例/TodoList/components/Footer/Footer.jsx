import React, { Component } from 'react'
import './index.css'
export default class Footer extends Component {
    allChecked = event => {
        this.props.allChecked(event.target.checked)
    }

    render() {
        const { todos } = this.props
        // 用filter实现 统计done 为true的长度
        // const trueTodos = this.props.todos.filter(todo => todo.done == true).length
        //总长度
        const todosLength = todos.length
        //用reduce实现 统计done 为true的长度
        const trueTodos = todos.reduce((pre, todo) => todo.done ? pre + 1 : pre, 0)
        return (

            <div className="todo-footer">
                <label>
                    <input type="checkbox" checked={todosLength == trueTodos && todosLength != 0 ? 'checked' : ''} onChange={this.allChecked} />
                </label>
                <span>
                    <span>已完成{trueTodos}</span> / 全部{todosLength}
                </span>
                <button onClick={this.props.clearComplete} className="btn btn-danger">清除已完成任务</button>
            </div>
        )
    }
}
