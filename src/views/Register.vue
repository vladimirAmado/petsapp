<template>
  <section class="form-section">
    <div class="form-image__wrap">
      <img
        src="../assets/images/Happy.svg"
        alt=""
      >
    </div>
    <form
      class="register-form"
      v-on:submit.prevent="onSubmit()"
    >
      <div class="register-form__container">
        <transition name="slide-fade" mode="in-out">
          <div class="slide-wrapper" v-if="step === 1">
            <div class="register-form__inputs inputs">
              <input
                id="name"
                v-model.trim="name"
                class="register-form__input input"
                type="text"
                name="name"
                v-on:input="$v.name.$touch()"
                v-on:blur="$v.name.$touch()"
                :class="{'input_error': ($v.name.$dirty && !$v.name.required), 'input_correct': !$v.name.$invalid }"
              >
              <label
                :class="{'label_active': $v.name.$model}"
                class="register-form__label label"
                for="name"
              >Ваше имя</label>
            </div>
            <div class="register-form__inputs inputs">
              <input
                id="email"
                v-model.trim="email"
                class="register-form__input input"
                type="text"
                name="email"
                v-on:input="$v.email.$touch()"
                v-on:blur="$v.email.$touch()"
                :class="{'input_error': ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email ), 'input_correct': !$v.email.$invalid }"
              >
              <label
                :class="{'label_active': $v.email.$model}"
                class="register-form__label label"
                for="email"
              >E-mail</label>
            </div>
          </div>
        </transition>
        <transition name="slide-fade" mode="in-out">
          <div class="slide-wrapper" v-if="step === 2">
            <div class="register-form__inputs inputs">
              <input
                id="password"
                v-model.trim="password"
                class="register-form__input input"
                type="password"
                name="password"
                v-on:input="$v.password.$touch()"
                v-on:blur="$v.password.$touch()"
                :class="{'input_error': ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLenght), 'input_correct': !$v.password.$invalid}"
              >
              <label
                :class="{'label_active': $v.password.$model}"
                class="register-form__label label"
                for="password"
              >Пароль</label>
            </div>
            <div class="register-form__inputs inputs">
              <input
                id="confirmPassword"
                v-model.trim="confirmPassword"
                class="register-form__input input"
                type="password"
                name="confirmPassword"
                v-on:input="$v.confirmPassword.$touch()"
                v-on:blur="$v.confirmPassword.$touch()"
                :class="{'input_error': ($v.confirmPassword.$dirty && !$v.confirmPassword.required) || ($v.confirmPassword.$dirty && !$v.confirmPassword.password), 'input_correct': !$v.confirmPassword.$invalid}"
              >
              <label
                :class="{'label_active': $v.confirmPassword.$model}"
                class="register-form__label label"
                for="confirmPassword"
              >Подтвердите пароль</label>
            </div>
          </div>
        </transition>
        <transition name="slide-fade" mode="in-out">
          <div class="slide-wrapper" v-if="step === 3">
            <div class="register-form__inputs inputs">
              <v-select name='country' :class="{'input_error': ($v.country.$dirty && !$v.country.required), 'input_correct': !$v.country.$invalid}" v-model="country" :options="sortedCountries" :reduce="country => ({ code: country.code, name: country.name })" label="name"></v-select>
              <label
                :class="{'label_active': $v.country.$model}"
                class="register-form__label label"
                for="country">
                Выберите страну
              </label>
            </div>
            <div class="register-form__inputs inputs">
              <v-select :class="{'input_error': ($v.city.$dirty && !$v.city.required), 'input_correct': !$v.city.$invalid}" v-model="city" :options="sortedCities" :reduce="city => ({ code: city.country_code, name: city.name })" label="name"></v-select>
              <label
                :class="{'label_active': $v.city.$model}"
                class="register-form__label label"
                for="country">
                Выберите город
              </label>
            </div>
          </div>
        </transition>
      </div>
      <nav class="form-nav">
        <ul class="form-nav__list">
          <li :class="{'form-nav__item_active': step === 1}" class="form-nav__item"></li>
          <li :class="{'form-nav__item_active': step === 2}" class="form-nav__item"></li>
          <li :class="{'form-nav__item_active': step === 3}" class="form-nav__item"></li>
        </ul>
      </nav>
      <button
        v-if="step < 3"
        type="button"
        class="btn btn_rounded"
        v-on:click="nextStep()"
      >
        Далее
      </button>
      <button
        v-if="step === 3"
        type="button"
        class="btn btn_rounded"
        v-on:click="onSubmit()"
      >
        Начать
      </button>
      <button
        v-if="step > 1"
        type="button"
        class="btn btn_rounded"
        v-on:click="step--"
      >
        Назад
      </button>
      <router-link
        to="/login"
        class="form__bottom-link"
      >
        Already have account? Sign in
      </router-link>
    </form>
  </section>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import vSelect from 'vue-select'
export default {
  name: 'Register',
  data: () => ({
    step: 1,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    city: '',
    countries: [],
    cities: []
  }),
  components: {
    vSelect
  },
  computed: {
    sortedCountries () {
      return [...this.countries].sort((a, b) => a.name.localeCompare(b.name))
    },
    sortedCities () {
      return [...this.cities].sort((a, b) => a.name.localeCompare(b.name)).filter(city => city.country_code === this.country.code)
    }
  },
  watch: {
    country: function () {
      if (this.country === null) {
        this.country = ''
        this.city = ''
      }
    }
  },
  mounted () {
    fetch('https://vladimiramado.github.io/data/cities.json')
      .then(response => response.json())
      .then(json => {
        this.cities = json
      })
    fetch('https://vladimiramado.github.io/data/countries.json')
      .then(response => response.json())
      .then(json => {
        this.countries = json
      })
  },
  validations: {
    name: { required },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    confirmPassword: {
      pass: sameAs('password'),
      required
    },
    country: { required },
    city: { required }
  },
  methods: {
    nextStep () {
      switch (this.step) {
        case 1:
          if (this.$v.name.$invalid || this.$v.email.$invalid) {
            this.$v.name.$touch()
            this.$v.email.$touch()
            return
          }
          this.step++
          break
        case 2:
          if (this.$v.password.$invalid || this.$v.confirmPassword.$invalid) {
            this.$v.password.$touch()
            this.$v.confirmPassword.$touch()
            return
          }
          this.step++
          break
      }
    },
    async onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        name: this.name,
        email: this.email,
        password: this.confirmPassword,
        country: this.country.name,
        city: this.city.name
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/Home')
      } catch (error) {}
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 1s;
}
.slide-fade-enter, .slide-fade-leave-active {
  opacity: 0;
}
.slide-fade-enter {
  transform: translateX(50%);
}
.slide-fade-leave-active {
  transform: translateX(-50%);
}
</style>
