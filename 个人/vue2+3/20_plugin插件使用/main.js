import { createApp } from 'vue'
import pluginObject from './plugins/plugins_object'
import App from './App.vue'
import directives from './directives'

const app = createApp(App)

directives(app)
app.use(pluginObject);

app.mount('#app')
