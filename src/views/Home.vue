<template>
  <div class="container">
    <Header/>
      <Cardfilter/>
      <Card/>
    <footer class="footer">
      <nav class="navbar">
        <ul class="navbar__list">
          <li class="navbar__item navbar__item_active">
            <a href="#" class="navbar__link">
              <i class="navbar__icon">
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.28571 11.2207V17.5H0.964286C0.709913 17.5 0.5 17.2923 0.5 17.0315V7.74786C0.5 7.62291 0.549441 7.50351 0.636754 7.41582L7.38675 0.636446C7.56789 0.454518 7.86068 0.454518 8.04182 0.636447L14.7918 7.41582C14.8791 7.50351 14.9286 7.62291 14.9286 7.74786V17.0315C14.9286 17.2923 14.7187 17.5 14.4643 17.5H10.1429V11.2207V10.7207H9.64286H5.78571H5.28571V11.2207Z" fill="white" stroke="white"/>
                </svg>
              </i>
              Home
            </a>
          </li>
          <li class="navbar__item">
            <a href="#" class="navbar__link">
              <i class="navbar__icon">
                <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3 1H22.7143C23.0735 1 23.4106 1.0947 23.702 1.26049L13.5694 7.86867C13.0714 8.19345 12.4286 8.19345 11.9306 7.86867L1.90185 1.32818C2.21706 1.12072 2.59443 1 3 1ZM1.22378 2.07984C1.08079 2.35529 1 2.66821 1 3V17C1 18.1046 1.89543 19 3 19H22.7143C23.8189 19 24.7143 18.1046 24.7143 17V3C24.7143 2.62631 24.6118 2.27656 24.4334 1.97732L14.1157 8.70628C13.2857 9.24758 12.2143 9.24758 11.3843 8.70628L1.22378 2.07984ZM0 3C0 1.34315 1.34315 0 3 0H22.7143C24.3711 0 25.7143 1.34315 25.7143 3V17C25.7143 18.6569 24.3711 20 22.7143 20H3C1.34314 20 0 18.6569 0 17V3Z" fill="#9D9BA5"/>
                </svg>
              </i>
              Message
            </a>
          </li>
          <li class="navbar__item">
            <a href="#" class="navbar__link">
              <i class="navbar__icon">
                <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.625 21C11.625 21 22.25 13.5817 22.25 6.54709C22.25 -0.487509 12.819 -1.01739 11.625 6.02635C10.431 -1.01739 1 -0.478373 1 7.09524C1 14.6689 11.625 21 11.625 21Z" stroke="#9D9BA5" stroke-linejoin="round"/>
                </svg>
              </i>
              Favorite
            </a>
          </li>
          <li class="navbar__item">
            <a href="#" class="navbar__link">
              <i class="navbar__icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2368 5.26316C14.2368 7.61763 12.3281 9.52632 9.97367 9.52632C7.61919 9.52632 5.71051 7.61763 5.71051 5.26316C5.71051 2.90868 7.61919 1 9.97367 1C12.3281 1 14.2368 2.90868 14.2368 5.26316ZM15.2368 5.26316C15.2368 8.16992 12.8804 10.5263 9.97367 10.5263C7.06691 10.5263 4.71051 8.16992 4.71051 5.26316C4.71051 2.3564 7.06691 0 9.97367 0C12.8804 0 15.2368 2.3564 15.2368 5.26316ZM7.86842 12.1316C3.52281 12.1316 0 15.6544 0 20H1C1 16.2067 4.0751 13.1316 7.86842 13.1316H12.0789C15.8723 13.1316 18.9474 16.2067 18.9474 20H19.9474C19.9474 15.6544 16.4246 12.1316 12.0789 12.1316H7.86842Z" fill="#9D9BA5"/>
                </svg>
              </i>
              User
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import messages from '@/plugins/messages'
import Card from '@/components/Card.vue'
import Cardfilter from '@/components/Cardfilter.vue'

export default {
  name: 'Home',
  data: () => ({}),

  components: {
    Header, Card, Cardfilter
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message] || 'Непредсказуемый какой чорт!')
    }
  }
}
</script>
