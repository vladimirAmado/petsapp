<template>
  <div id="app" class="app">
    <transition name="spinner">
      <Loader v-if="loading"/>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view v-if="appReady" />
    </transition>
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue'

export default {
  name: 'petApp',
  components: { Loader },
  data: () => ({
    appReady: false,
    loading: true
  }),
  created () {
    this.$router.beforeEach((to, from, next) => {
      this.loading = true
      setTimeout(next, 1000)
    })

    this.$router.afterEach((to, from) => {
      this.loading = false
    })
  },
  mounted () {
    setTimeout(() => {
      this.loading = false
      this.appReady = true
    }, 1000)
  }
}
</script>

<style src="./assets/sass/Main.sass" lang="sass"></style>
<style lang="sass">
  .fade-enter-active,
  .fade-leave-active
    transition: opacity 0.3s
  .fade-enter,
  .fade-leave-active
    opacity: 0

  .spinner-enter-active,
  .spinner-leave-active
    transition: opacity 1s ease-in

  .spinner-enter,
  .spinner-leave-active
    opacity: 0
</style>
