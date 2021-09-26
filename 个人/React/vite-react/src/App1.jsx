import React, { PureComponent } from 'react'


export default class App extends PureComponent {
  state = { count: 0 }

  increment = () => {
    setTimeout(() => {
      this.setState({ count: this.state.count++ })
      console.log(this.state.count);
         this.setState({ count: this.state.count++ })
      console.log(this.state.count);
         this.setState({ count: this.state.count++ })
      console.log(this.state.count);
    }, 0);
  }

  render() {
    return (
      <div>
        <h2>{this.state.count}</h2>
        <button onClick={this.increment}>+1</button>
        <Home count={this.state.count} />
      </div>
    )
  }
}

class Home extends PureComponent {

  render() {
    return (
      <div>
        <h1>{this.props.count}</h1>
      </div>
    )
  }
}