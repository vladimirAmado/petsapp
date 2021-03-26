import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import firebase from 'firebase/app'
import Vuesax from 'vuesax'
import messagePlugin from '@/plugins/messages.plugin'
import 'vuesax/dist/vuesax.css'
import './registerServiceWorker'
import 'firebase/auth'
import 'firebase/database'
import vSelect from 'vue-select'

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
Vue.use(Vuesax)
Vue.use(messagePlugin)
Vue.config.productionTip = false
Vue.component('v-select', vSelect)

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
