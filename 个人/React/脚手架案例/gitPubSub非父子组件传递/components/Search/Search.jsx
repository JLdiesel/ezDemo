import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'
export default class Search extends Component {
    search = () => {
        const { keyWordNode: { value: keyWord } } = this
        //刚进入时更新状态
        PubSub.publish('updateAppState', { isFirst: false, isLoading: true })

        axios.get(`/api/search/users?q=${keyWord}`).then(
            res => {
                PubSub.publish('updateAppState', { users: res.data.items, isLoading: false })
                //请求成功后通知更新状态
            },
            err => {
                PubSub.publish('updateAppState', { users: [], isLoading: false, err: err.message })
            }
        )

    }
    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">搜索GitHub用户</h3>
                <div>
                    <input ref={c => this.keyWordNode = c} type="text" placeholder="输入关键词" />&nbsp;
                    <button onClick={this.search}>搜索</button>
                </div>
            </section>
        )
    }
}
