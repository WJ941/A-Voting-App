import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

export default new VueX.Store({
  state: {
    isUserLoggedIn: false,
    user: null,
    token: null,
    isGetMyPolls: false
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setToken (state, token) {
      if (token) {
        state.token = token
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
        state.token = null
      }
    },
    setPolls (state, polls) {
      state.isGetMyPolls = polls
    }
  },
  actions: {
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setPolls ({commit}, polls) {
      commit('setPolls', polls)
    }
  }
})
