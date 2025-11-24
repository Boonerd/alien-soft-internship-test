// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import './index.css' // or your tailwind file

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)  // ← This line!

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')