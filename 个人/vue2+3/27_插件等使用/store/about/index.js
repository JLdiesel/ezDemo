import { createStore } from 'vuex'

const store = createStore({
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++
        }
    },
    actions: {

    },
    modules: {

    }
})
export default store