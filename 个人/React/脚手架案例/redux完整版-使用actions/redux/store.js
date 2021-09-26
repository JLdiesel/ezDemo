//引入createstore创建store对象
import { createStore } from 'redux'
import countReducer from './count_reducer'
export default createStore(countReducer)

