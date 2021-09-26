import { createStore } from 'vuex'
import about from './about'
import home from './home'
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
        about, home
    }
})
export default store