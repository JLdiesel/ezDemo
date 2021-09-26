import { mapState, createNamespacedHelpers } from 'vuex'
import useVuexMap from './useVuexState'

export default function useState(moduleName, mapper) {
    let mapperFn = mapState
    if (typeof moduleName === "string" && moduleName.length > 0) {
        mapperFn = createNamespacedHelpers(moduleName).mapState
    } else {
        mapper = moduleName
    }
    return useVuexMap(mapper, mapperFn)
}