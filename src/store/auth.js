import firebase from 'firebase/app'

export default {
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        const error = e
        throw error
      }
    },
    async register ({ dispatch, commit }, { email, password, name, city, country }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          name: name,
          city: city,
          country: country
        })
      } catch (e) {
        const error = e
        throw error
      }
    },
    getUid () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout () {
      await firebase.auth().signOut()
    }
  }
}
