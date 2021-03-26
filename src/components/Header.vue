<template>
    <header class="header">
      <nav class="navbar">
        <div class="navbar__location">
          <svg class="navbar__location_mark" width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C2.23571 0 0 2.43444 0 5.44444C0 9.52778 5 14 5 14C5 14 10 9.52778 10 5.44444C10 2.43444 7.76429 0 5 0ZM5 7.77778C6.18347 7.77778 7.14286 6.73311 7.14286 5.44444C7.14286 4.15578 6.18347 3.11111 5 3.11111C3.81653 3.11111 2.85714 4.15578 2.85714 5.44444C2.85714 6.73311 3.81653 7.77778 5 7.77778Z" fill="#ff5f54"/>
          </svg>
          <span> {{country}}, {{city}} </span>
          <svg class="navbar__location_delete" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.6">
              <path d="M4.24268 4.24265L12.728 12.7279" stroke="#3C3C43" stroke-linecap="round"/>
              <path d="M12.7279 4.24265L4.24262 12.7279" stroke="#3C3C43" stroke-linecap="round"/>
            </g>
          </svg>
        </div>
        <div class="navbar__account">
          <div class="navbar__account-wrap">
            <img src="@/assets/images/Profile.png" alt="">
          </div>
          <div class="navbar__account-name">
            {{name[0]}}
          </div>
        </div>
      </nav>
      <div class="header-search">
        <input placeholder="Search" class="input" type="text" name="search" id="search">
        <button class="header-search__btn" type="submit">
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.3833 14.1851C7.76123 14.1851 9.04785 13.6871 10.0938 12.857L14.0283 17.2287C14.2109 17.4316 14.4517 17.5331 14.7007 17.5331C15.2402 17.5331 15.6304 17.0719 15.6304 16.4817C15.6304 16.205 15.5474 15.9467 15.3647 15.7438L11.4551 11.3905C12.2769 10.1915 12.7666 8.7066 12.7666 7.09256C12.7666 3.19119 9.89453 0 6.3833 0C2.86377 0 0 3.19119 0 7.09256C0 10.9939 2.86377 14.1851 6.3833 14.1851ZM6.3833 12.6541C3.63574 12.6541 1.37793 10.1362 1.37793 7.09256C1.37793 4.04894 3.63574 1.53103 6.3833 1.53103C9.12256 1.53103 11.3887 4.04894 11.3887 7.09256C11.3887 10.1362 9.12256 12.6541 6.3833 12.6541Z" fill="white"/>
          </svg>
        </button>
      </div>
    </header>
</template>

<script>
export default {
  name: 'Header',
  data: () => ({}),
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  computed: {
    name () {
      return this.$store.getters.info.name || 'user'
    },
    country () {
      return this.$store.getters.info.country
    },
    city () {
      return this.$store.getters.info.city
    }
  },
  methods: {
    async logout () {
      try {
        await this.$store.dispatch('logout')
        this.$router.push('/?message=logout')
      } catch (error) {}
    }
  }
}
</script>
