import React, { PureComponent, memo } from 'react'
class Child extends PureComponent {
    render() {
        console.log("child 被调用props");
        return (
            <div>你好</div>
        )
    }
}
const MemoHeader = memo(function Header() {
    console.log("header组件被调用");
    return (
        <div>header</div>
    )
}
)

export default class App extends PureComponent {
    state = { count: 0 };
    increament = () => {
        const { count } = this.state
        this.setState({ count: count + 1 })
    }
    render() {
        const { count } = this.state
        return (
            <div>
                <div>count:{count}</div>
                <button onClick={this.increament}>点我+1</button>
                <Child />
                <MemoHeader />
            </div>
        )
    }
}
