import * as LocalAuth from '../local/LocalAuth'
import * as AuthService from '../services/AuthService'

export default {
  namespaced: true,

  state: () => ({
    user: {},
    isLoggedIn: false,
    autoLoginDone: false
  }),

  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_IS_LOGGED_IN(state, payload) {
      state.isLoggedIn = payload
    },
    AUTO_LOGIN_DONE(state) {
      state.autoLoginDone = true
    }
  },

  actions: {
    async login({ commit, dispatch }, credentials) {
      await AuthService.login(credentials)
      await dispatch('loadUser')
      LocalAuth.login()
      commit('SET_IS_LOGGED_IN', true)
    },

    async register({ commit, dispatch }, data) {
      await AuthService.register(data)
      await dispatch('loadUser')
      LocalAuth.login()
      commit('SET_IS_LOGGED_IN', true)
    },

    async loadUser({ commit }) {
      const { data } = await AuthService.user()
      commit('SET_USER', data)
    },

    async autoLogin({ commit, dispatch }) {
      commit('AUTO_LOGIN_DONE')

      if (LocalAuth.isLoggedIn()) {
        // if this fails, the error is propagated up to the caller
        await dispatch('loadUser')
        commit('SET_IS_LOGGED_IN', true)
      } else {
        // throw an exception if auto login proccess fails
        throw new Error('401')
      }
    }
  }
}
