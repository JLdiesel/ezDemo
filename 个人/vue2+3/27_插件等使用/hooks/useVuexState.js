import { computed } from 'vue'
import { useStore, mapState } from 'vuex'

export default  function useVuexState(vuexArr,fn){
    const store=useStore()
    const mapStateFns = fn(vuexArr)
    const storeState={}
    Object.keys(mapStateFns).forEach(fnKeys => {
        const fn = mapStateFns[fnKeys].bind({ $store: store })
        storeState[fnKeys]=computed(fn)
    })
    return storeState

}