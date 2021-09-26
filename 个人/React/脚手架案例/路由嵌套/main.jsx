import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.render(
  //用路由器包裹
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
