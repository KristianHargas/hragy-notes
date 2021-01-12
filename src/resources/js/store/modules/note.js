import * as NoteService from '../../services/NoteService'

export default {
  namespaced: true,

  state: () => ({
    notes: [],
    notesFetched: false
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
    },
    SET_NOTES_FETCHED(state, payload) {
      state.notesFetched = payload
    }
  },

  actions: {
    async index({ commit }) {
      const { data } = await NoteService.index()
      commit('SET_NOTES', { notes: data })
      commit('SET_NOTES_FETCHED', true)
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
    notesCount(state) {
      return state.notes.length
    },
    getNoteById: (state) => (id) => {
      return state.notes.find((note) => note.id == id)
    }
  }
}
