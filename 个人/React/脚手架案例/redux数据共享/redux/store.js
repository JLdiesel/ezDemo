//引入createstore创建store对象
import { createStore,applyMiddleware,combineReducers} from 'redux'
import countReducer from './reducers/count'
import personReducer from './reducers/person'
//引入redux-thunk 用于支持异步action
import thunk from 'redux-thunk'
//汇总所有的reducer为一个总的reducer
const allReducer = combineReducers({
    count: countReducer,
    person: personReducer
})
export default createStore(allReducer,applyMiddleware(thunk))

