import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'
import { Provider } from 'react-redux'
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
//检测redux中状态的改变，如果redux状态改变，则重新渲染App组件
