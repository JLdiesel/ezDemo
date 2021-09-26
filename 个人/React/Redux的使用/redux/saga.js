import { takeEvery,put,all} from 'redux-saga/effects'
import { ASYNCDECREMENT } from './content'
import {decrement} from './actions/countAction'
import axios from 'axios'
function* asyncData(action) {
         yield new Promise((res,rej) => {
            setTimeout(() => {
                console.log(123);
                res(123)
            }, 4000);
        })
        yield all([
        yield axios.get("http://123.207.32.32:8000/home/multidata"),
        yield put(decrement(1))
     ])

}
function* mySaga() {
    yield takeEvery(ASYNCDECREMENT,asyncData)
}

export default mySaga