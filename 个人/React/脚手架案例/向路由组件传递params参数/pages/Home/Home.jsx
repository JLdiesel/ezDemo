import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import MyNavLink from '../../components/MyNavLink'
import Message from './Message/Message'
import News from './News/News'
export default class Home extends Component {
    render() {
        return (
            <div>
                <div>  我是home组件</div>
                <div>
                    <ul className="nav nav-tabs">
                        <li>
                            <MyNavLink to='/home/news' >News</MyNavLink>
                        </li>
                        <li>
                            <MyNavLink to='/home/message' >message</MyNavLink>
                        </li>
                    </ul>
                    <Switch>
                        <Route path='/home/news' component={News} />
                        <Route path='/home/message' component={Message} />
                        <Redirect to='/home/news' />
                    </Switch>
                </div>
            </div>
        )
    }
}
