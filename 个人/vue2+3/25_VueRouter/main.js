import { createApp } from 'vue'
import pluginObject from './plugins/plugins_object'
import App from './App.vue'
import directives from './directives'
import router from './router'

const app = createApp(App).use(router)

directives(app)
app.use(pluginObject);
// app.use(axios)
app.mount('#app')
