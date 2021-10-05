import React, { PureComponent } from 'react'
import About from './Component/About'
import Home from './Component/Home'
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom'
import './app.css'
export default class App extends PureComponent {
  state = { id: 12 }
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavLink to='/home' activeClassName='link-active'>首页</NavLink>
          <NavLink to={`/about?id=${this.state.id}`} activeClassName='link-active'>关于</NavLink>
          <Switch>
            <Route path='/home' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/:id' component={About} />
          </Switch>
        </BrowserRouter>


      </div>
    )
  }
}
