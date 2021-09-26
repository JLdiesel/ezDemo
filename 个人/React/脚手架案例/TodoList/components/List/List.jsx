import React, { Component } from 'react'
//引入proptypes对props类型进行限制
import propTypes from 'prop-types'
import './index.css'
import Item from '../Item/Item'
export default class List extends Component {

    static propTypes = {
        updateTodo: propTypes.func.isRequired,
        todos: propTypes.array.isRequired,
        deleteTodos: propTypes.func.isRequired,
    }
    render() {

        const { todos, updateTodo, deleteTodos } = this.props
        return (
            <ul className="todo-main" >
                {
                    todos.map(todo => {
                        return <Item key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodos={deleteTodos} />
                    })
                }
            </ul>
        )
    }
}