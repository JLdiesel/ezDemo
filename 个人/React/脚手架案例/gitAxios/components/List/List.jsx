import React, { Component } from 'react'
import './index.css'
export default class List extends Component {
    render() {
        const { users, isFirst, isLoading, err } = this.props
        return (

            <div className="row">
                {
                    isFirst ? <h2>欢迎使用</h2> : isLoading ? <h2>正在加载中</h2> : err ? <h2 style={{ color: 'red' }}>{err}</h2> :
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
