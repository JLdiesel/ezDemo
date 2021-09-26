import React, { PureComponent, memo } from 'react'
import { EventEmitter } from 'events'
const eventBus = new EventEmitter();
class Child extends PureComponent {
    componentDidMount() {
        eventBus.addListener('Emit', (...args) => this.SayHello(args))
    }
    componentWillUnmount() {
        eventBus.removeListener('Emit')
    }
    SayHello(args) {
        console.log(args);
    }
    render() {
        console.log("child 被调用props");
        return (
            <div>你好</div>
        )
    }
}
const MemoHeader = memo(function Header() {
    console.log("header组件被调用");
    function emitEvent() {
        eventBus.emit("Emit", "我发射了", 666)
    }
    return (
        <div >header
            <button onClick={emitEvent}>我要发射拉</button>
        </div>

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
