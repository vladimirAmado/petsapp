<template>
  <div class="container">
    <div v-if="loadingAnimals">
      <div class="card-list">
        <div class="card card_loading" v-for="n in 10" :key="n"></div>
      </div>
    </div>
    <div class="card-list" v-else-if="Object.keys(filtredAnimals).length">
      <div
        class="card"
        v-for="(animal, index) in filtredAnimals"
        :key="index"
        v-on:click="detailAnimal(index)"
      >
        <div class="card__head">
          <div class="card__head-img" v-if="animal.img">
            <img :src="animal.img" alt="" />
          </div>
          <div class="card__head-btn card__head-btn_added">
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 17C9.5 17 18 11.0654 18 5.43767C18 -0.190007 10.4552 -0.613911 9.5 5.02108C8.54476 -0.613911 1 -0.182699 1 5.87619C1 11.9351 9.5 17 9.5 17Z"
                stroke="#ff5f54"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div class="card__bottom">
          <div
            class="card__bottom-sex"
            :class="{
              'card__bottom-sex_female': animal.sex === 'Female',
              'card__bottom-sex_male': animal.sex === 'Male',
              'card__bottom-sex_adult': animal.age > 12,
              'card__bottom-sex_puppy': animal.age <= 12,
            }"
          >
            <span v-if="animal.age > 12">Adult</span>
            <span v-if="animal.age <= 12">Puppy</span>
            <svg
              v-if="animal.sex === 'Female'"
              width="13"
              height="22"
              viewBox="0 0 13 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.8751 6.65967C11.8751 9.64703 9.45333 12.0688 6.46598 12.0688C3.47862 12.0688 1.05688 9.64703 1.05688 6.65967C1.05688 3.67231 3.47862 1.25058 6.46598 1.25058C8.00003 1.25058 9.38423 1.88853 10.3692 2.91496C11.3024 3.88732 11.8751 5.20609 11.8751 6.65967Z"
                stroke="#9B8ACA"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.46597 12.5688L6.46597 20.7506M2.37506 16.6597H10.5569"
                stroke="#9B8ACA"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              v-else-if="animal.sex === 'Male'"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1316 12.1842C11.1316 15.12 8.75162 17.5 5.81579 17.5C2.87996 17.5 0.5 15.12 0.5 12.1842C0.5 9.24838 2.87996 6.86842 5.81579 6.86842C7.32338 6.86842 8.6837 7.49536 9.65173 8.50409C10.5688 9.45969 11.1316 10.7557 11.1316 12.1842Z"
                stroke="#F4A325"
              />
              <path
                d="M9.8421 8.1579L17 1M17 1V7.93421M17 1H9.8421"
                stroke="#F4A325"
              />
            </svg>
          </div>
          <div class="card__bottom-name">
            {{ animal.name }}
          </div>
          <div class="card__bottom-type">
            {{ animal.type }}
          </div>
        </div>
      </div>
    </div>
    <h3 v-else>
      Хмм. Похоже, животные, которых вы ищете, ускользнули. Простите за это. Как странно...
    </h3>
    <div class="card-detail" :class="{'card-detail_show' : active}">
      <div class="card-detail__controls">
        <div class="card-detail__back" v-on:click="detailClose()">
          <svg width="13" height="21" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0371 20.5827L0.792152 11.4458C0.402616 11.0612 0.402616 10.4398 0.792152 10.0542L10.0371 0.917333C10.5995 0.360889 11.5144 0.360889 12.0777 0.917333C12.64 1.47378 12.64 2.37687 12.0777 2.93332L4.16913 10.7505L12.0777 18.5657C12.64 19.1231 12.64 20.0262 12.0777 20.5827C11.5144 21.1391 10.5995 21.1391 10.0371 20.5827Z" fill="white"/>
          </svg>
        </div>
        <div class="card-detail__favorite">
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 17C9.5 17 18 11.0654 18 5.43767C18 -0.190007 10.4552 -0.613911 9.5 5.02108C8.54476 -0.613911 1 -0.182699 1 5.87619C1 11.9351 9.5 17 9.5 17Z"
              stroke="#ff5f54"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div class="card-detail__head">
        <img :src="animal.img" :alt="animal.name">
      </div>
      <div class="card-detail__info">
        <div class="card-detail__tags">
          <div class="card-detail__tag">
            <span>Age</span>
            <p>{{age}}</p>
          </div>
          <div class="card-detail__tag">
            <span>Weight</span>
            <p>{{animal.weight}}</p>
          </div>
          <div class="card-detail__tag">
            <span>Sex</span>
            <p>{{animal.sex}}</p>
          </div>
        </div>
        <div class="card-detail__desc">
          <div class="card-detail__name">{{animal.name}}</div>
          <div class="card-detail__type">{{animal.type}}</div>
          <div class="card-detail__location">{{animal.location}}</div>
          <div class="card-detail__about">
            <h2>About</h2>
            {{animal.about}}
          </div>
        </div>
        <div class="card-detail__footer">
          <a href="#" class="btn btn_rounded ">Adopt</a>
          <a href="tel:" class="btn btn_rounded btn_icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.66304 0.599976H2.99998C1.67449 0.599976 0.599976 1.67449 0.599976 2.99998V5.39997C0.599976 12.0274 5.97256 17.4 12.6 17.4H15C16.3255 17.4 17.4 16.3255 17.4 15V13.3416C17.4 12.8871 17.1432 12.4716 16.7366 12.2683L13.8375 10.8187C13.1844 10.4922 12.3934 10.8198 12.1624 11.5126L11.8051 12.5845C11.5737 13.2789 10.8614 13.6923 10.1437 13.5487C7.27112 12.9742 5.02575 10.7288 4.45123 7.85627C4.30769 7.13856 4.72104 6.42629 5.41541 6.19483L6.74576 5.75138C7.34063 5.55309 7.68254 4.93024 7.53046 4.32192L6.82721 1.50893C6.69366 0.974732 6.21368 0.599976 5.66304 0.599976Z" fill="#fff" stroke="#fff" stroke-width="0.79"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Card',
  data: () => ({
    active: false,
    filter: [],
    animal: []
  }),
  async mounted () {
    if (!Object.keys(this.animals).length) {
      await this.fetchAnimals()
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
    age () {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const dob = new Date('2019-02-13')
      const dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate())
      let age
      const mounth = today.getMonth() - dob.getMonth()
      age = today.getFullYear() - dob.getFullYear()
      if (today < dobnow) {
        age = age - 1
      }
      return `${age}год ${mounth} месяца`
    },
    arrfilter () {
      return this.$store.getters.filter
    },
    ...mapGetters(['animals', 'loadingAnimals'])
  },
  methods: {
    detailAnimal (index) {
      this.animal = this.filtredAnimals[index]
      this.active = true
      document.body.classList.add('overflow')
    },
    detailClose () {
      this.active = !this.active
      document.body.classList.remove('overflow')
    },
    ...mapActions(['fetchAnimals'])
  }
}
</script>
