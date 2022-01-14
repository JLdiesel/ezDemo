import React, { PureComponent } from 'react'
import Home from './Home'
import About from './About'
export default class App extends PureComponent {
  state = { isShow: false, count: 0 }

  getName = (names) => {
    this.setState(
      {
        name: names
      }, () => {
        console.log(this.state);
      }
    )

  }
  /*  addonce = () => {
     this.setState({
       count: this.state.count + 1
     })
   } */
  componentDidMount() {
    // document.getElementById('btn').addEventListener('click', () => {
    //   this.setState((state) => ({ count: state.count + 1 }));
    //   console.log(this.state.count);
    // });
    // document.getElementById('btn').addEventListener('click', () => {
    //   this.setState({ count: this.state.count + 1 });
    //   console.log(this.state.count);
    // })
  }
  addonce = () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.setState({ count: this.state.count + 1 })
        console.log(this.state.count);
      })
    }
  }

  /*  changeProps = (fun) => {
     fun(this.state.count)
   } */
  render() {
    return (
      <div>
        {/* <About changeName={this.getName} /> */}
        {/* <Home getName={this.getName} /> */}
        <button id='btn' onClick={this.addonce}>+1</button>
        <div>{this.state.count}</div>
        {/* <Home add={this.addonce} /> */}
      </div>
    )
  }
}
