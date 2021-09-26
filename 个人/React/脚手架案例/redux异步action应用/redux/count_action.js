import { INCREMENT, DECREMENT } from './constant'
import store from './store'
//同步action指的是action的值为Object的一般对象

export const createIncrementAction = data => ({ type: INCREMENT, data })
export const createDecrementAction = data => ({ type: DECREMENT, data })
//异步action指的是action的返回值为函数,异步action中一般都会调用同步action
export const createIncrementAsyncAction = (data, time) => {
    return () => {
        setTimeout(() => {
            store.dispatch(createIncrementAction(data))
        }, time);
    }
}
