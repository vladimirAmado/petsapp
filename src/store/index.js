import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    filter: []
  },
  mutations: {
    setFilter (state, filter) {
      state.filter = filter
    },
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error,
    filter: s => s.filter
  },
  actions: {
  },
  modules: {
    auth, info
  }
})
