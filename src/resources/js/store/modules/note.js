import * as NoteService from '../../services/NoteService'

export default {
  namespaced: true,

  state: () => ({
    notes: []
  }),

  mutations: {
    SET_NOTES(state, payload) {
      state.notes = payload.notes
    },
    STORE_NOTE(state, payload) {
      state.notes.unshift(payload.note)
    },
    UPDATE_NOTE(state, payload) {
      state.notes = state.notes.map((note) =>
        note.id == payload.note.id ? payload.note : note
      )
    },
    DESTROY_NOTE(state, payload) {
      state.notes = state.notes.filter((note) => note.id != payload.id)
    }
  },

  actions: {
    async index({ commit }) {
      const { data } = await NoteService.index()
      commit('SET_NOTES', { notes: data })
    },
    async store({ commit }, payload) {
      const { data } = await NoteService.store(payload.note)
      commit('STORE_NOTE', { note: data })
    },
    async update({ commit }, payload) {
      const { data } = await NoteService.update(payload.id, payload.note)
      commit('UPDATE_NOTE', { note: data })
    },
    async destroy({ commit }, payload) {
      await NoteService.destroy(payload.id)
      commit('DESTROY_NOTE', payload)
    }
  },

  getters: {
    getNotesCount(state) {
      return state.notes.length
    },
    getNoteById: (state) => (id) => {
      return state.notes.find((note) => note.id == id)
    }
  }
}
