import { INCREMENT, DECREMENT, ASYNCDECREMENT } from '../content'

export const increment = (payload) => ({
    type: INCREMENT,
    payload
})
export const decrement = (payload) => ({
    type: DECREMENT,
    payload
})
export const asyncIncrement = (payload,timeout=1000) => ((dispatch,getstate) => {
    setTimeout(() => {
        console.log(dispatch);
        console.log(getstate());
        dispatch(increment(payload))
    },timeout)
})

export const asyncDecrement = {
    type:ASYNCDECREMENT
}
