import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
//检测redux中状态的改变，如果redux状态改变，则重新渲染App组件
store.subscribe(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
})