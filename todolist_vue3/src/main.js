import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'vue3-toastify/dist/index.css'
import '@/styles/index.scss'
import { useThemeStore } from './stores/theme'
import { useEventStore } from './stores/event'
import * as func from './stores/function'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

const themeStore = useThemeStore(pinia)
const eventStore = useEventStore(pinia)
themeStore.$subscribe((mutation, state) => {
  func.theme_local.set(state)
})
eventStore.$subscribe((mutation, state) => {
  func.local.set(state)
})

app.mount('#app')
