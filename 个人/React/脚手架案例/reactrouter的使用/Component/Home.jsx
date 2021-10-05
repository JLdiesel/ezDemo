import React, { PureComponent } from 'react'
import { Route, Redirect, NavLink, Switch } from 'react-router-dom'
import MianInner from './mianInner'
import Special from './Special'
React.createElement()
export default class Home extends PureComponent {
    goAbout = () => {
        this.props.history.push('/about')
    }
    goSpecial = () => {
        this.props.history.push('/home/specialty')

    }
    render() {
        return (
            <div>

                <NavLink exact to='/home'>主要内容</NavLink>
                <NavLink to={{
                    pathname: '/home/specialty',
                    search: '?name:abc',
                    state: {
                        name: '金龙',
                        age: '18'
                    }
                }}>特色</NavLink>
                <button onClick={this.goAbout}>查看关于</button>
                <button onClick={this.goSpecial}>查看特色</button>
                <Switch>
                    <Route exact path='/home' component={MianInner} />
                    <Route path='/home/specialty' component={Special} />
                </Switch>
                <Redirect to='/home' />
            </div>
        )
    }
}
