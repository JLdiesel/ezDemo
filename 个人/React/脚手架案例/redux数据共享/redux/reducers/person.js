import {ADD_PERSON} from '../constant'
const initialState = [{
    id: '001',
    name: 'tom',
    age:18
}
]
export default (state = initialState, { type, data }) => {
    switch (type) {

    case ADD_PERSON:
        // return state.push(payload)
            return [data,...state]
    default:
        return state
    }
}
