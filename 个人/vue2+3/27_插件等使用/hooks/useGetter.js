import { mapGetters, createNamespacedHelpers } from 'vuex'
import useVuexMap from './useVuexState'

export default function useState(moduleName, mapper) {
    let mapperFn = mapGetters
    if (typeof moduleName === "string" && moduleName.length > 0) {
        mapperFn = createNamespacedHelpers(moduleName).mapGetters
    } else {
        mapper = moduleName
    }
    return useVuexMap(mapper, mapperFn)
}