import firebase from 'firebase/app'

export default {
  state: {
    animals: [],
    filter: [],
    loadingAnimals: true
  },
  mutations: {
    setFilter (state, filter) {
      state.filter = filter
    },
    setAnimals (state, animals) {
      state.animals = animals
    },
    loadingAnimals (state, loadingAnimals) {
      state.loadingAnimals = loadingAnimals
    }
  },
  actions: {
    async guidGenerator () {
      var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
      return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
    },
    async fetchAnimals ({ dispatch, commit }) {
      try {
        const info = (await firebase.database().ref('/animals/').once('value')).val()
        commit('setAnimals', info)
        commit('loadingAnimals', false)
      } catch (error) { }
    },
    async addAnimal ({ dispatch, commit }, { name, age, location, sex, weight, type, groupID, about, img }) {
      try {
        const uid = await dispatch('guidGenerator')
        await firebase.database().ref(`animals/${uid}/`).set({
          name: name,
          age: age,
          location: location,
          sex: sex,
          weight: weight,
          type: type,
          groupID: groupID,
          about: about,
          img: img
        })
        dispatch('fetchAnimals')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    filter: s => s.filter,
    animals: s => s.animals,
    loadingAnimals: s => s.loadingAnimals
  }
}
