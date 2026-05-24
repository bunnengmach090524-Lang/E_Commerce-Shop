import { createApp } from 'vue'
import { createPinia } from 'pinia'      // ← must have this
import App from './App.vue'
import router from './router/index.js'
import './style.css'

const app = createApp(App)
app.use(createPinia())                   // ← must have this
app.use(router)
app.mount('#app')