
import {INCREMENT,DECREMENT} from './constant'
//创建一个为count组件服务的reducer
//reducer会接收两个函数，分别为之前的状态(preState)，动作对象(action)
const initState=0
export default  function countReducer(preState=initState, action) {
    //从action对象中获取:type,data
    const { type, data } = action
    //根据type决定如何加工数据
    switch (type) {
        case INCREMENT://加
            return preState + data
        case DECREMENT://减
           return preState-data
        default:
            return preState
    }
}

