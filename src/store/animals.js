/* eslint-disable no-unused-vars */
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
    async fetchAnimals ({ dispatch, commit }) {
      try {
        const info = (await firebase.database().ref('/animals/').once('value')).val()
        commit('setAnimals', info)
        commit('loadingAnimals', false)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async addFavorite ({ dispatch, commit }, { animalId, uid }) {
      try {
        await firebase.database().ref(`animals/${animalId}/users/`).push().set(uid)
        dispatch('fetchAnimals')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async removeFavorite ({ dispatch, commit }, { animalId, key }) {
      try {
        await firebase.database().ref(`animals/${animalId}/users/`).child(key).remove()
        dispatch('fetchAnimals')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async addAnimal ({ dispatch, commit }, { name, age, location, sex, weight, type, groupID, about, img }) {
      try {
        await firebase.database().ref('/animals').push().set({
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
