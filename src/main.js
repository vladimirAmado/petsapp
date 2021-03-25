import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import './registerServiceWorker'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyCTKFVPORd4_zq8m-OUUhceRfSoZNoRiIE',
  authDomain: 'vue-app-pets.firebaseapp.com',
  projectId: 'vue-app-pets',
  storageBucket: 'vue-app-pets.appspot.com',
  messagingSenderId: '474114702267',
  appId: '1:474114702267:web:30e54d6d5519c9fba4a29e'
}

firebase.initializeApp(config)

Vue.use(Vuelidate)
Vue.config.productionTip = false

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
