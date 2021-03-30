import firebase from 'firebase/app'

export default {
  state: {
    info: {},
    animals: []
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    setAnimals (state, animals) {
      state.animals = animals
    },
    clearInfo (state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setInfo', info)
      } catch (error) {}
    },
    async fetchAnimals ({ dispatch, commit }) {
      try {
        const info = (await firebase.database().ref('/animals').once('value')).val()
        commit('setAnimals', info)
      } catch (error) {}
    }
  },
  getters: {
    info: s => s.info,
    animals: s => s.animals
  }
}
