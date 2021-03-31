import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Start',
    meta: { layout: 'NoLayout' },
    component: () => import('../views/Start.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'NoLayout' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'NoLayout' },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/home',
    name: 'Home',
    meta: { auth: true, layout: 'MainLayout', search: true },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/pet',
    name: 'Pet',
    meta: { auth: true, layout: 'MainLayout', search: false },
    component: () => import('../views/Pet.vue')
  },
  {
    path: '/favorite',
    name: 'Favorite',
    meta: { auth: true, layout: 'MainLayout', search: false },
    component: () => import('../views/Favorite.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { auth: true, layout: 'MainLayout' },
    component: () => import('../views/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, form, next) => {
  const currentUser = firebase.auth().currentUser
  const requiredAuth = to.matched.some(record => record.meta.auth)
  if (!currentUser && requiredAuth) {
    next('/login?message=auth')
  } else if ((to.path === '/login' || to.path === '/' || to.path === '/register') && currentUser) {
    next('/home')
  } else {
    next()
  }
})
export default router
