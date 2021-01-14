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
    }
    // UPDATE_NOTE(state, payload) {
    //   state.notes = state.notes.map((note) =>
    //     note.id == payload.note.id ? payload.note : note
    //   )
    // },
    // DESTROY_NOTE(state, payload) {
    //   state.notes = state.notes.filter((note) => note.id != payload.id)
    // }
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
    }
    // async update({ commit }, payload) {
    //   const { data } = await NoteService.update(payload.id, payload.note)
    //   commit('UPDATE_NOTE', { note: data })
    // },
    // async destroy({ commit }, payload) {
    //   await NoteService.destroy(payload.id)
    //   commit('DESTROY_NOTE', payload)
    // }
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
    }
  }
}
