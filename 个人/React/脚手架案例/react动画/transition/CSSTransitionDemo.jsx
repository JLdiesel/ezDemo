import React, { PureComponent } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Button } from 'antd'
import './CSSTransition.css'
export default class CSSTransitionDemo extends PureComponent {
    state = {
        isShow: true
    }
    changes = () => {
        this.setState((state) => {
            return { isShow: !state.isShow }
        })
    }
    render() {
        const { isShow } = this.state
        return (
            <div>
                <button onClick={this.changes}>显示/隐藏</button>
                <Button onClick={this.changes}>按钮</Button>
                <CSSTransition in={isShow}
                    classNames="card"
                    appear
                    timeout={300}
                    //隐藏后是否卸载
                    unmountOnExit={true}
                    onEnter={el => console.log('开始进入')}
                    onEntering={el => console.log('正在进入')}
                    onEntered={el => console.log('进入完成')}
                    onExit={el => console.log('开始退出')}
                    onExiting={el => console.log('退出中')}
                    onExited={el => console.log('退出完成')}
                >
                    <div>
                        <Button>按钮</Button>
                        <h2>哈哈哈 </h2>
                    </div>
                </CSSTransition>

            </div>
        )
    }
}
