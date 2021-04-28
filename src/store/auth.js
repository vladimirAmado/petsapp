import firebase from 'firebase/app'

export default {
  state: {
    auth: {}
  },
  mutations: {
    setAuth (state, auth) {
      state.auth = auth
    },
    clearAuth (state) {
      state.auth = {}
    }
  },
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register ({ dispatch, commit }, { email, password, name, city, country }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          name: name,
          city: city.name,
          country: country.name
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    getUid ({ dispatch, commit }) {
      const user = firebase.auth().currentUser
      if (user) {
        commit('setAuth', user.uid)
      }
      return user ? user.uid : null
    },
    async logout ({ commit }) {
      await firebase.auth().signOut()
      commit('clearInfo')
      commit('clearAuth')
    }
  },
  getters: {
    auth: s => s.auth
  }
}
