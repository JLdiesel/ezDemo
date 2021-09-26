import React, { PureComponent } from 'react'
import store from '../redux/index'
export function connect(mapStateToProps, mapDispatchToProps) {
    return function (Components) {
          return class Apps extends PureComponent {
            constructor(props) {
                super(props);
                this.state = {
                    storeState:mapStateToProps(store.getState().count)
                }
              }
              componentDidMount() {
                  store.subscribe(()=>{
                      this.setState({
                      storeState:mapStateToProps(store.getState())
                  })
                  })
              }
              
            render() {
                console.log('hello');
                return <Components  {...this.props} {...mapStateToProps(store.getState())} {...mapDispatchToProps(store.dispatch)}/>
              
            }
       
        }
       
    }
}