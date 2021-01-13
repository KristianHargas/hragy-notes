require('./bootstrap')
require('alpinejs')

import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import Logo from './shared/components/Logo'
import FormLabel from './shared/components/FormLabel'
import FormInput from './shared/components/FormInput'
import FormArea from './shared/components/FormArea'
import FormErrors from './shared/components/FormErrors'
import FormButton from './shared/components/FormButton'
import FloatingActionButton from './shared/components/FloatingActionButton'
import LoadingSpinner from './shared/components/LoadingSpinner'
import CheckablePill from './shared/components/CheckablePill'
import axios from 'axios'
import { is401 } from './shared/utils/response'

axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (is401(err)) {
      store.dispatch('auth/logoutLocally')
      router.currentRoute.name !== 'Login' && router.replace({ name: 'Login' })
      // clear vuex data
    }

    throw err
  }
)

const app = createApp(App)
app.use(router).use(store)

app.component('Logo', Logo)
app.component('FormLabel', FormLabel)
app.component('FormInput', FormInput)
app.component('FormArea', FormArea)
app.component('FormErrors', FormErrors)
app.component('FormButton', FormButton)
app.component('FloatingActionButton', FloatingActionButton)
app.component('LoadingSpinner', LoadingSpinner)
app.component('CheckablePill', CheckablePill)

app.mount('#app')
