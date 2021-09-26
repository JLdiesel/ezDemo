import React, { PureComponent } from 'react'
import Home from './Component/Home'
import About from './Component/About'
export default class App extends PureComponent {
  render() {
    return (
      <div>
        <About />
        <Home />
      </div>
    )
  }
}
