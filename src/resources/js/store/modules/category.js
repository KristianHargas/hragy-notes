import * as CategoryService from '../../services/CategoryService'

export default {
  namespaced: true,

  state: () => ({
    categories: []
  }),

  mutations: {
    SET_CATEGORIES(state, payload) {
      state.categories = payload
    },
    STORE_CATEGORY(state, payload) {
      state.categories.unshift(payload.category)
    },
    UPDATE_CATEGORY(state, payload) {
      state.categories = state.categories.map((category) =>
        category.id == payload.category.id ? payload.category : category
      )
    },
    DESTROY_CATEGORY(state, payload) {
      state.categories = state.categories.filter(
        (category) => category.id != payload.id
      )
    }
  },

  actions: {
    async index({ commit }) {
      const { data } = await CategoryService.index()
      commit('SET_CATEGORIES', data)
    },
    async store({ commit }, payload) {
      const { data } = await CategoryService.store(payload.category)
      commit('STORE_CATEGORY', { category: data })
    },
    async update({ commit }, payload) {
      const { data } = await CategoryService.update(
        payload.id,
        payload.category
      )
      commit('UPDATE_CATEGORY', { category: data })
    },
    async destroy({ commit }, payload) {
      await CategoryService.destroy(payload.id)
      commit('DESTROY_CATEGORY', payload)
      commit('note/REMOVE_CATEGORY', payload, { root: true })
      commit('checklist/REMOVE_CATEGORY', payload, { root: true })
    }
  },

  getters: {
    getCategoryBySlug: (state) => (slug) => {
      return state.categories.find((category) => category.slug == slug)
    },
    getCategoryById: (state) => (id) => {
      return state.categories.find((category) => category.id == id)
    }
  }
}
