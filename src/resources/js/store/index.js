import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      count: 1
    }
  },
  mutations: {
    INC(state) {
      state.count++
    },
    DEC(state) {
      state.count--
    }
  }
})

export default store