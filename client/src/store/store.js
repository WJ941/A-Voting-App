import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

export default new VueX.Store({
  state: {
    isUserLoggedIn: false,
    user: null,
    token: null,
    toGetMyPolls: null,
    toGetPolls: null
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
    toGetMyPolls (state, datetime) {
      state.toGetMyPolls = datetime
    },
    toGetPolls (state, datetime) {
      state.toGetPolls = datetime
    }
  },
  actions: {
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    toGetMyPolls ({commit}, datetime) {
      commit('toGetMyPolls', datetime)
    },
    toGetPolls ({commit}, datetime) {
      commit('toGetPolls', datetime)
    }
  }
})
