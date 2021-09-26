import { INCREMENT, DECREMENT } from '../constant'
import store from '../store'
export const  increament= (payload) => ({
    type: INCREMENT,
    payload
})
export const  decreament= (payload) => ({
    type: DECREMENT,
    payload
})
export const asyncIncreament = (payload,timeout=1000) => (() =>  {
    setTimeout(() => {
        store.dispatch(increament(payload))
    }, timeout);
})
