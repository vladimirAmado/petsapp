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
              <vs-input
                type="text"
                shadow
                label-placeholder="Name"
                v-model.trim="name"
                dark
                :state="successName"
                v-on:input="$v.name.$touch()"
                v-on:blur="$v.name.$touch()"
              >
                <template
                  v-if="($v.name.$dirty && !$v.name.required)"
                  #message-danger
                >
                  Required
                </template>
              </vs-input>
            </div>
            <div class="register-form__inputs inputs">
              <vs-input
                type="email"
                shadow
                label-placeholder="E-mail"
                v-model="email"
                dark
                :state="successEmail"
                v-on:input="$v.email.$touch()"
                v-on:blur="$v.email.$touch()"
              >
                <template
                  v-if="($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email )"
                  #message-danger
                >
                  E-mail invalid
                </template>
              </vs-input>
            </div>
          </div>
        </transition>
        <transition name="slide-fade" mode="in-out">
          <div class="slide-wrapper" v-if="step === 2">
            <div class="register-form__inputs inputs">
              <vs-input
                shadow
                type="password"
                label-placeholder="Password"
                v-model="password"
                dark
                :state="successPass"
                v-on:input="$v.password.$touch()"
                v-on:blur="$v.password.$touch()"
                :visiblePassword="hasVisiblePassword"
                icon-after
                v-on:click-icon="hasVisiblePassword = !hasVisiblePassword"
                >
                <template #icon>
                  <i v-if="!hasVisiblePassword" class='bx bx-show-alt bx-xs'></i>
                  <i v-else class='bx bx-hide bx-xs'></i>
                </template>
                <template
                  v-if="($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)"
                  #message-danger
                >
                  Required
                </template>
              </vs-input>
            </div>
            <div class="register-form__inputs inputs">
              <vs-input
                shadow
                type="password"
                label-placeholder="confirmPassword"
                v-model="confirmPassword"
                dark
                :state="successConfirmPass"
                v-on:input="$v.confirmPassword.$touch()"
                v-on:blur="$v.confirmPassword.$touch()"
                :visiblePassword="hasVisiblePassword"
                >
                <template
                  v-if="($v.confirmPassword.$dirty && !$v.confirmPassword.required) || ($v.confirmPassword.$dirty && !$v.confirmPassword.pass)"
                  #message-danger
                >
                  Required
                </template>
              </vs-input>
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
import messages from '@/plugins/messages'
export default {
  name: 'Register',
  data: () => ({
    step: 1,
    hasVisiblePassword: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    countries: [],
    city: '',
    cities: []
  }),
  computed: {
    sortedCountries () {
      return [...this.countries].sort((a, b) => a.name.localeCompare(b.name))
    },
    sortedCities () {
      return [...this.cities].sort((a, b) => a.name.localeCompare(b.name)).filter(city => city.country_code === this.country.code)
    },
    successEmail: function () {
      if (!this.$v.email.$invalid) {
        return 'success'
      } else if ((this.$v.email.$dirty && !this.$v.email.required) || (this.$v.email.$dirty && !this.$v.email.email)) {
        return 'danger'
      } else {
        return ''
      }
    },
    successPass: function () {
      if (!this.$v.password.$invalid) {
        return 'success'
      } else if ((this.$v.password.$dirty && !this.$v.password.required) || (this.$v.password.$dirty && !this.$v.password.minLength)) {
        return 'danger'
      } else {
        return ''
      }
    },
    successName: function () {
      if (!this.$v.name.$invalid) {
        return 'success'
      } else if ((this.$v.name.$dirty && !this.$v.name.required)) {
        return 'danger'
      } else {
        return ''
      }
    },
    successConfirmPass: function () {
      if (!this.$v.confirmPassword.$invalid) {
        return 'success'
      } else if ((this.$v.confirmPassword.$dirty && !this.$v.confirmPassword.required) || (this.$v.confirmPassword.$dirty && !this.$v.confirmPassword.password)) {
        return 'danger'
      } else {
        return ''
      }
    },
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    country: function () {
      if (this.country === null) {
        this.country = ''
        this.city = ''
      }
    },
    error (e) {
      this.$error(messages[e.code])
    }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
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
        this.$router.push('/home?message=register')
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
