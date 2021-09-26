import './index.css'
import React, { Component } from 'react'


export default class Item extends Component {
    //点击checkbox触发函数，通过id查找，更改todos的done
    handleCheck = id => {
        return event => {
            this.props.updateTodo(id, event.target.checked)
        }
    }
    //删除一个todo的回调
    handleDelete = id => {
        if (confirm('确定删除吗')) {
            this.props.deleteTodos(id);
        } else {
            return
        }

    }
    render() {
        const { todo } = this.props
        return (
            <li >
                <label>
                    <input type="checkbox" checked={todo.done ? 'checked' : ''} onChange={this.handleCheck(todo.id)} />
                    <span>{todo.name}</span>
                </label>
                <button onClick={() => { this.handleDelete(todo.id) }} className="btn btn-danger"  >删除</button>
            </li>
        )
    }
}
