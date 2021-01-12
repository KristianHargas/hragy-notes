import * as NoteService from '../../services/NoteService'

export default {
  namespaced: true,

  state: () => ({
    notes: []
  }),

  mutations: {
    SET_NOTES(state, payload) {
      state.notes = payload
    }
  },

  actions: {
    async fetch({ commit }) {
      const { data } = await NoteService.index()
      commit('SET_NOTES', data)
    }
  }
}
