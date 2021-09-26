import React, { PureComponent } from 'react'

export default class App extends PureComponent {
    state = { username: '', fruits: 'banana' }
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.username);
        console.log(this.state.fruits);
    }
    handleChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    change = (e) => {
        this.setState({
            fruits: e.target.value
        })

    }
    render() {
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    {/* 受控组件 */}
                    <label htmlFor="username">
                        用户<input type="text"
                            id='username'
                            onChange={e => this.handleChange(e)}
                            value={this.state.username} />
                    </label>
                    <select name="fruits" onChange={e => this.change(e)} value={this.state.fruits} >
                        <option value="apple">苹果</option>
                        <option value="banana">香蕉</option>
                        <option value="orange">橘子</option>

                    </select>
                    <input type="submit" value='提交' />
                </form>
            </div>
        )
    }
}
