import {
    createStore
} from 'vuex'

export default createStore({
    state: {
        count: 123
    },
    mutations: {
        increment(state) {
            this.state.count++
        },
        decrement(state) {
            this.state.count--
        }
    },
    getters: {
        powerCount(state) {
            return state.count * state.count
        }
    },
    actions: {},
    modules: {}
})