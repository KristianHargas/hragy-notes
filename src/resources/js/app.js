require('./bootstrap')
require('alpinejs')

import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import Logo from './shared/components/Logo'

const app = createApp(App)

app.use(router).use(store)

app.component('Logo', Logo)

app.mount('#app')
