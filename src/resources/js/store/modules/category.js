import * as CategoryService from '../../services/CategoryService'

export default {
  namespaced: true,

  state: () => ({
    categories: []
  }),

  mutations: {
    SET_CATEGORIES(state, payload) {
      state.categories = payload
    }
  },

  actions: {
    async fetch({ commit }) {
      const { data } = await CategoryService.index()
      commit('SET_CATEGORIES', data)
    }
  }
}
