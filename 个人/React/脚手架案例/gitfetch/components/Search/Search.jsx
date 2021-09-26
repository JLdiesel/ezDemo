import React, { Component } from 'react'
import PubSub from 'pubsub-js'
export default class Search extends Component {
    search = async () => {
        const { keyWordNode: { value: keyWord } } = this
        //刚进入时更新状态
        PubSub.publish('updateAppState', { isFirst: false, isLoading: true })
        //fetch方法发送请求
        try {
            const result = await fetch(`/api/search/users?q=${keyWord}`)
            const data = await result.json()
            console.log(data);
            PubSub.publish('updateAppState', { users: data.items, isLoading: false })
        } catch (error) {
            console.log('产生错误', error);
            PubSub.publish('updateAppState', { users: [], isLoading: false, err: error })
        }

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
