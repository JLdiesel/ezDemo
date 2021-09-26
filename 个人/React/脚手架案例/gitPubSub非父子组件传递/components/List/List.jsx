import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'
export default class List extends Component {
    state = {
        users: [],//users数组初始化
        isFirst: true,//是否为第一次打开页面
        isLoading: false,
        err: '',
    }
    componentDidMount() {
        PubSub.subscribe('updateAppState', (_, stateObj) => {
            console.log(_);
            this.setState(stateObj)
        })
    }
    render() {
        const { users, isFirst, isLoading, err } = this.state
        return (

            <div className="row">
                {
                    isFirst ? <h2>欢迎使用</h2> :
                        isLoading ? <h2>正在加载中</h2> :
                            err ? <h2 style={{ color: 'red' }}>{err}</h2> :
                                users.map(userObj => <div key={userObj.id} className="card">
                                    <a href={userObj.html_url} target="_blank" rel='noreferrer'>
                                        <img alt="head_protrait" src={userObj.avatar_url} style={{ width: 100 + 'px' }} />
                                    </a>
                                    <p className="card-text">{userObj.login}</p>
                                </div>)
                }

            </div>
        )
    }
}
