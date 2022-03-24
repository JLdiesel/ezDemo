// Import vue component
import EsignBizIndicatorV3 from './index.vue'

// Declare install function executed by Vue.use()
function install(Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component(EsignBizIndicatorV3.name, EsignBizIndicatorV3)
}

EsignBizIndicatorV3.install = install // 这样可以用 Vue.use(EsignBizIndicatorV3)

// Create module definition for Vue.use()
const plugin = {
  install,
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

// To allow use as module (npm/webpack/etc.) export component
export default EsignBizIndicatorV3
