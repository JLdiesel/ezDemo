import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import countReducer from './reducers/countReducer'
import mySaga from './saga'
const sagaMiddleware =createSagaMiddleware()
import {composeWithDevTools} from 'redux-devtools-extension'
export default createStore(countReducer, composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)))


sagaMiddleware.run(mySaga);
// export default createStore(countReducer,composeWithDevTools(applyMiddleware(thunk)))