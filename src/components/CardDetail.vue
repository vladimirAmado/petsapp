<template>
  <div class="card-detail" :class="{ 'card-detail_show': active }">
    <div class="card-detail__controls">
      <div class="card-detail__back" v-on:click="detailClose()">
        <svg
          width="13"
          height="21"
          viewBox="0 0 13 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.0371 20.5827L0.792152 11.4458C0.402616 11.0612 0.402616 10.4398 0.792152 10.0542L10.0371 0.917333C10.5995 0.360889 11.5144 0.360889 12.0777 0.917333C12.64 1.47378 12.64 2.37687 12.0777 2.93332L4.16913 10.7505L12.0777 18.5657C12.64 19.1231 12.64 20.0262 12.0777 20.5827C11.5144 21.1391 10.5995 21.1391 10.0371 20.5827Z"
            fill="white"
          />
        </svg>
      </div>
      <div class="card-detail__favorite" :class="{ 'card-detail__favorite_added' : isFavorite }" v-on:click="favorite(animalId)">
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
      <img :src="detail.img" :alt="detail.name" />
    </div>
    <div class="card-detail__info">
      <div class="card-detail__tags">
        <div class="card-detail__tag">
          <span>возраст</span>
          <p v-html="age"></p>
        </div>
        <div class="card-detail__tag">
          <span>Weight</span>
          <p>{{ detail.weight }}</p>
        </div>
        <div class="card-detail__tag">
          <span>Sex</span>
          <p>{{ sex }}</p>
        </div>
      </div>
      <div class="card-detail__desc">
        <div class="card-detail__name">{{ detail.name }}</div>
        <div class="card-detail__type">{{ detail.type }}</div>
        <div class="card-detail__location">{{ detail.location }}</div>
        <div class="card-detail__about">
          <h2>About</h2>
          {{ detail.about }}
        </div>
      </div>
      <div class="card-detail__footer">
        <vs-button
          color="#ff5f54"
          type="button"
          class="btn btn_rounded"
        >
          Adopt
        </vs-button>
        <a href="tel:" class="btn btn_rounded btn_icon">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.66304 0.599976H2.99998C1.67449 0.599976 0.599976 1.67449 0.599976 2.99998V5.39997C0.599976 12.0274 5.97256 17.4 12.6 17.4H15C16.3255 17.4 17.4 16.3255 17.4 15V13.3416C17.4 12.8871 17.1432 12.4716 16.7366 12.2683L13.8375 10.8187C13.1844 10.4922 12.3934 10.8198 12.1624 11.5126L11.8051 12.5845C11.5737 13.2789 10.8614 13.6923 10.1437 13.5487C7.27112 12.9742 5.02575 10.7288 4.45123 7.85627C4.30769 7.13856 4.72104 6.42629 5.41541 6.19483L6.74576 5.75138C7.34063 5.55309 7.68254 4.93024 7.53046 4.32192L6.82721 1.50893C6.69366 0.974732 6.21368 0.599976 5.66304 0.599976Z"
              fill="#fff"
              stroke="#fff"
              stroke-width="0.79"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CardDetail',
  props: ['detail', 'active', 'detailClose', 'animalId', 'favorite'],
  computed: {
    sex () {
      if (this.detail.sex === true) {
        return 'Female'
      } else {
        return 'Male'
      }
    },
    age () {
      const mounths = ['месяц', 'месяца', 'месяцев']
      const years = ['год', 'года', 'лет']
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const dob = new Date(this.detail.age)
      const dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate())
      let year, mounth

      year = today.getFullYear() - dob.getFullYear()
      if (today < dobnow) {
        year = year - 1
      }
      mounth = this.monthDiff(dob, today) % 12
      const age = (year === 0 ? '' : year += ' ' + this.plural(year, years) + '<br>') + (mounth === 0 ? '' : mounth += ' ' + this.plural(mounth, mounths))
      return age
    },
    isFavorite () {
      if (this.animalId && this.animals[this.animalId].users) {
        return Object.values(this.animals[this.animalId].users).includes(this.auth)
      } else {
        return false
      }
    },
    ...mapGetters(['auth', 'animals'])
  },
  methods: {
    plural (num, titles) {
      num = num % 100
      if (num > 19) {
        num = num % 10
      }
      switch (num) {
        case 1:
          return titles[0]
        case 2: case 3: case 4:
          return titles[1]
        default:
          return titles[2]
      }
    },
    monthDiff (d1, d2) {
      var months
      months = (d2.getFullYear() - d1.getFullYear()) * 12
      months -= d1.getMonth() + 1
      months += d2.getMonth()
      return months <= 0 ? 0 : months
    }
  }
}
</script>
