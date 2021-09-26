import {ADD_PERSON} from '../constant'
const initialState = [
    {
        id: '001',
        name: "小红",
        age:18
    }
]

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case ADD_PERSON:
        return [ ...state, payload ]

    default:
        return state
    }
}
