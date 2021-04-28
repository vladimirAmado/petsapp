<template>
  <section class="home">
    <Cardfilter/>
    <div class="container">
      <div v-if="loadingAnimals">
        <div class="card-list">
          <div class="card card_loading" v-for="n in 10" :key="n"></div>
        </div>
      </div>
      <div class="card-list" v-else-if="Object.keys(filtredAnimals).length">
      <Card
        v-for="(animal, index) in filtredAnimals"
        :key="index"
        :animal="animal"
        :index="index"
        :detailAnimal="detailAnimal"
        :favorite="favorite"
      />
      </div>
      <h3 v-else>
        Хмм. Похоже, животные, которых вы ищете, ускользнули. Простите за это. Как странно...
      </h3>
    </div>
    <CardDetail :detailClose="detailClose" :active="active" :detail="animal" :animalId="animalId" :favorite="favorite"/>
  </section>
</template>

<script>
import messages from '@/plugins/messages'
import Card from '@/components/Card.vue'
import CardDetail from '@/components/CardDetail.vue'
import Cardfilter from '@/components/Cardfilter.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  data: () => ({
    active: false,
    filter: [],
    animal: [],
    animalId: null
  }),
  async mounted () {
    if (!Object.keys(this.animals).length) {
      await this.fetchAnimals()
    }
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message] || 'Непредсказуемый какой чорт!')
    }
  },
  watch: {
    arrfilter () {
      this.filter = this.$store.getters.filter
    }
  },
  computed: {
    filtredAnimals () {
      if (this.filter.length !== 0 && Object.keys(this.animals).length) {
        const arr = Object.keys(this.animals).filter(item => this.filter.includes(this.animals[item].groupID))
        return arr.reduce((acc, item) => {
          acc[item] = this.animals[item]
          return acc
        }, {})
      } else {
        return this.animals
      }
    },
    arrfilter () {
      return this.$store.getters.filter
    },
    ...mapGetters(['animals', 'loadingAnimals', 'auth'])
  },
  methods: {
    detailAnimal (index) {
      this.animal = this.filtredAnimals[index]
      this.animalId = index
      this.active = true
      document.body.classList.add('overflow')
    },
    detailClose () {
      this.active = !this.active
      document.body.classList.remove('overflow')
    },
    favorite (animalId) {
      const data = {
        animalId: animalId,
        uid: this.auth
      }
      if (this.animals[animalId].users) {
        let isFavorite
        for (const [key, value] of Object.entries(this.animals[animalId].users)) {
          if (value === this.auth) {
            isFavorite = key
          }
        }
        data.key = isFavorite
        if (isFavorite) {
          this.removeFavorite(data)
        } else {
          this.addFavorite(data)
        }
      } else {
        this.addFavorite(data)
      }
    },
    ...mapActions(['fetchAnimals', 'addFavorite', 'removeFavorite'])
  },
  components: {
    Card, Cardfilter, CardDetail
  }
}
</script>
