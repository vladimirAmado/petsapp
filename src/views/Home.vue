<template>
  <section class="home">
    <Cardfilter/>
    <Card/>
  </section>
</template>

<script>
import messages from '@/plugins/messages'
import Card from '@/components/Card.vue'
import Cardfilter from '@/components/Cardfilter.vue'

export default {
  name: 'Home',
  data: () => ({}),

  components: {
    Card, Cardfilter
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message] || 'Непредсказуемый какой чорт!')
    }
  }
}
</script>
