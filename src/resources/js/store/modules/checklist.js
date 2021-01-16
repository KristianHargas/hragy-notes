import * as ChecklistService from '../../services/ChecklistService'

export default {
  namespaced: true,

  state: () => ({
    checklists: []
  }),

  mutations: {
    SET_CHECKLISTS(state, payload) {
      state.checklists = payload.checklists
    },
    STORE_CHECKLIST(state, payload) {
      state.checklists.unshift(payload.checklist)
    },
    UPDATE_CHECKLIST(state, payload) {
      state.checklists = state.checklists.map((checklist) =>
        checklist.id == payload.checklist.id ? payload.checklist : checklist
      )
    },
    DESTROY_CHECKLIST(state, payload) {
      state.checklists = state.checklists.filter(
        (checklist) => checklist.id != payload.id
      )
    }
  },

  actions: {
    async index({ commit }) {
      const { data } = await ChecklistService.index()

      const checklists = data.map((checklist) => {
        checklist.items = JSON.parse(checklist.items)
        return checklist
      })

      commit('SET_CHECKLISTS', { checklists })
    },
    async store({ commit }, payload) {
      const { data } = await ChecklistService.store(payload.checklist)

      data.items = JSON.parse(data.items)

      commit('STORE_CHECKLIST', { checklist: data })
    },
    async update({ commit }, payload) {
      const { data } = await ChecklistService.update(
        payload.id,
        payload.checklist
      )

      data.items = JSON.parse(data.items)

      commit('UPDATE_CHECKLIST', { checklist: data })
    },
    async destroy({ commit }, payload) {
      await ChecklistService.destroy(payload.id)
      commit('DESTROY_CHECKLIST', payload)
    }
  },

  getters: {
    getChecklistsCount(state) {
      return state.checklists.length
    },
    getChecklistById: (state) => (id) => {
      return state.checklists.find((checklist) => checklist.id == id)
    },
    getChecklistsOfCategory: (state) => (id) => {
      return state.checklists.filter((checklist) => {
        const categories = checklist.categories.map((category) => category.id)
        return categories.includes(id)
      })
    },
    getLatest(state) {
      return state.checklists[0]
    }
  }
}
