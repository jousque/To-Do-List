import { createApp } from 'vue'
import router from './router'
import store from './store'
import './style.css'
import App from './App.vue'
import VueIcon from 'vue3-icon'
import VueFeather from 'vue-feather';

createApp(App)
.use(router)
.use(store)
.use(VueIcon)
.mount('#app')
