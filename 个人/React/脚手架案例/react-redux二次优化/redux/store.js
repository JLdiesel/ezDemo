//引入createstore创建store对象
import { createStore,applyMiddleware } from 'redux'
import count from './count_reducer'
//引入redux-thunk
import thunk from 'redux-thunk'
export default createStore(count,applyMiddleware(thunk))

