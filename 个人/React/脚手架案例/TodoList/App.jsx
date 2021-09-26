import React, { Component } from 'react'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import List from './components/List/List'
import './App.css'
//创建并暴露APP组件
export default class App extends Component {
    //初始化状态
    state = {
        todos: [
            {
                id: '001',
                name: '吃饭',
                done: true
            },
            {
                id: '002',
                name: '睡觉',
                done: true
            },
            {
                id: '003',
                name: '打代码',
                done: false
            }, {
                id: '004',
                name: '逛该',
                done: false
            }
        ]
    }
    //用于添加一个todo  传给header  
    addTodo = itemObj => {
        this.setState({ todos: [itemObj, ...this.state.todos] })
    }
    //更新todos中的是否已完成
    updateTodo = (id, done) => {
        //获取状态中的todos
        const { todos } = this.state
        const newTodos = todos.map(todo => {
            if (todo.id == id) {
                return { ...todo, done }
            } else return todo
        })
        this.setState({ todos: newTodos })
    }
    //删除方法 filter 实现
    delelteTodos = id => {
        const { todos } = this.state
        const newTodos = todos.filter(todo => {
            return todo.id !== id
        })
        this.setState({ todos: newTodos })
    }
    //全选方法 map实现
    allChecked = done => {
        const { todos } = this.state
        const newTodos = todos.map(todo => { return { ...todo, done } })
        this.setState({ todos: newTodos })
    }
    //清除已完成的todos
    clearComplete = () => {
        const { todos } = this.state
        const newTodos = todos.filter(todo => todo.done == false)
        this.setState({ todos: newTodos })
    }
    render() {
        const { todos } = this.state
        return (
            <div>
                <div className="todo-container">
                    <div className="todo-wrap">
                        <Header addTodo={this.addTodo} />
                        <List deleteTodos={this.delelteTodos} todos={todos} updateTodo={this.updateTodo} />
                        <Footer todos={todos} allChecked={this.allChecked} clearComplete={this.clearComplete} />
                    </div>
                </div>
            </div>
        )
    }
}
