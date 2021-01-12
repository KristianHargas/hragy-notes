import * as LocalAuth from '../../local/LocalAuth'
import * as AuthService from '../../services/AuthService'

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
      if (LocalAuth.isLoggedIn()) {
        try {
          await dispatch('loadUser')
          commit('SET_IS_LOGGED_IN', true)
        } catch (err) {
          dispatch('logoutLocally')
        }
      } else {
        dispatch('logoutLocally')
      }

      commit('AUTO_LOGIN_DONE')
    },

    logoutLocally({ commit }) {
      LocalAuth.logout()
      commit('SET_USER', {})
      commit('SET_IS_LOGGED_IN', false)
    },

    async logout({ commit, dispatch }) {
      try {
        await AuthService.logout()
      } catch (err) {
        //
      }

      dispatch('logoutLocally')
    }
  }
}
