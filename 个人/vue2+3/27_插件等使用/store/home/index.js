import { createStore } from 'vuex'

const store = createStore({
    namespaces: true,
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++
        }
    },
    getters: {
        /*  doubleHomeCounter(state, getters, rootState, rootGetters) {
             return state.count + rootState.count
         } */
    },
    actions: {
        /*     incrementAction({ commit, dispatch, state, rootState, rootGetters, getters }) {
                setTimeout(() => {
                    //穿透到根store
                    commit("increment", null, { root: true })
                }, 2000);
            } */

    },
    modules: {

    }
})
export default store