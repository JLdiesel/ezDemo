import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MyNavLink from './components/MyNavLink'
import About from './pages/About/About'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
export default class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <Header />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              <MyNavLink to={'/home'}  >Home</MyNavLink>
              <MyNavLink to={'/about'}  >About</MyNavLink>

              {/* <a className="list-group-item active" href="./about.html">About</a>
              <a className="list-group-item" href="./home.html">Home</a> */}

            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">

                <Route path='/about' component={About} />
                <Route path='/home' component={Home} />


              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
