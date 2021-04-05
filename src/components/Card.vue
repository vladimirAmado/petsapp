<template>
  <div class="card" v-on:click="detailAnimal(index)">
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
          'card__bottom-sex_female': animal.sex === true,
          'card__bottom-sex_male': animal.sex === false,
          'card__bottom-sex_adult': tag,
          'card__bottom-sex_puppy': !tag,
        }"
      >
        <span v-if="tag">Adult</span>
        <span v-if="!tag">Puppy</span>
        <svg
          v-if="animal.sex === true"
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
          v-else-if="animal.sex === false"
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
</template>

<script>
export default {
  name: 'Card',
  props: {
    animal: {
      type: Object,
      required: true,
      default: null
    },
    detailAnimal: {},
    index: {}
  },
  computed: {
    year () {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const dob = new Date(this.animal.age)
      const dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate())
      let year
      year = today.getFullYear() - dob.getFullYear()
      if (today < dobnow) {
        year = year - 1
      }
      return year
    },
    mounth () {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const dob = new Date(this.animal.age)
      const mounth = today.getMonth() - dob.getMonth()
      return mounth
    },
    tag () {
      let tag = true
      if (this.year !== 0) {
        tag = true
      } else if (this.mounth <= 12) {
        tag = false
      }
      return tag
    }
  }
}
</script>
