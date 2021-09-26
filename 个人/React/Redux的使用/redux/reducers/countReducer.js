import {INCREMENT,DECREMENT,ASYNCINCREMENT} from '../content'
const initialState = {
    count:0
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case INCREMENT:
            return {...state,count:state.count+payload}
    case DECREMENT:
            return {...state,count:state.count-payload}

    default:
        return state
    }
}
