import { createStore } from 'vuex'
import auth from './modules/auth'
import note from './modules/note'
import category from './modules/category'
import checklist from './modules/checklist'

const store = createStore({
  state: () => ({}),

  mutations: {},

  actions: {},

  modules: {
    auth,
    note,
    category,
    checklist
  }
})

export default store
