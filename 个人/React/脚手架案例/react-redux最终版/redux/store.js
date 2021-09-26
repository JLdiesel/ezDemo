import { createStore, applyMiddleware } from 'redux'
//引入汇总之后的reducer
import Reducer from './reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
export default createStore(Reducer,composeWithDevTools(applyMiddleware(thunk)))