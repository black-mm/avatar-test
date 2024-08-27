import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import './styles/reset.css'
import './styles/global.scss'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')

