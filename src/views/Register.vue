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
                v-model.trim="formData.name"
                dark
                :state="successName"
                v-on:input="$v.formData.name.$touch()"
                v-on:blur="$v.formData.name.$touch()"
              >
                <template
                  v-if="($v.formData.name.$dirty && !$v.formData.name.required)"
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
                v-model="formData.email"
                dark
                :state="successEmail"
                v-on:input="$v.formData.email.$touch()"
                v-on:blur="$v.formData.email.$touch()"
              >
                <template
                  v-if="($v.formData.email.$dirty && !$v.formData.email.required) || ($v.formData.email.$dirty && !$v.formData.email.email )"
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
                v-model="formData.password"
                dark
                :state="successPass"
                v-on:input="$v.formData.password.$touch()"
                v-on:blur="$v.formData.password.$touch()"
                :visiblePassword="hasVisiblePassword"
                icon-after
                v-on:click-icon="hasVisiblePassword = !hasVisiblePassword"
                >
                <template #icon>
                  <i v-if="!hasVisiblePassword" class='bx bx-show-alt bx-xs'></i>
                  <i v-else class='bx bx-hide bx-xs'></i>
                </template>
                <template
                  v-if="($v.formData.password.$dirty && !$v.formData.password.required) || ($v.formData.password.$dirty && !$v.formData.password.minLength)"
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
                v-model="formData.confirmPassword"
                dark
                :state="successConfirmPass"
                v-on:input="$v.formData.confirmPassword.$touch()"
                v-on:blur="$v.formData.confirmPassword.$touch()"
                :visiblePassword="hasVisiblePassword"
                >
                <template
                  v-if="($v.formData.confirmPassword.$dirty && !$v.formData.confirmPassword.required) || ($v.formData.confirmPassword.$dirty && !$v.formData.confirmPassword.pass)"
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
              <v-select name='country' :class="{'input_error': ($v.formData.country.$dirty && !$v.formData.country.required), 'input_correct': !$v.formData.country.$invalid}" v-model="formData.country" :options="countries" :reduce="country => ({ code: country.code, name: country.name })" label="name"></v-select>
              <label
                :class="{'label_active': $v.formData.country.$model}"
                class="register-form__label label"
                for="country">
                Выберите страну
              </label>
            </div>
            <div class="register-form__inputs inputs">
              <v-select :class="{'input_error': ($v.formData.city.$dirty && !$v.formData.city.required), 'input_correct': !$v.formData.city.$invalid}" v-model="formData.city" :options="sortedCities" :reduce="city => ({ code: city.country_code, name: city.name })" label="name"></v-select>
              <label
                :class="{'label_active': $v.formData.city.$model}"
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
      <vs-button
        color="#ff5f54"
        v-if="step < 3"
        type="button"
        class="btn btn_rounded"
        v-on:click="nextStep()"
      >
        Далее
      </vs-button>
      <vs-button
        color="#ff5f54"
        v-if="step === 3"
        type="button"
        class="btn btn_rounded"
        v-on:click="onSubmit()"
      >
        Начать
      </vs-button>
      <vs-button
        color="#ff5f54"
        v-if="step > 1"
        type="button"
        class="btn btn_rounded"
        v-on:click="step--"
      >
        Назад
      </vs-button>
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
import { mapActions, mapGetters } from 'vuex'
import messages from '@/plugins/messages'
export default {
  name: 'Register',
  data: () => ({
    step: 1,
    hasVisiblePassword: false,
    formData: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
      city: ''
    }
  }),
  computed: {
    sortedCities () {
      return this.cities.filter(city => city.country_code === this.formData.country.code)
    },
    success: function () {
      const succes = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
      return succes
    },
    successEmail: function () {
      if (!this.$v.formData.email.$invalid) {
        return 'success'
      } else if ((this.$v.formData.email.$dirty && !this.$v.formData.email.required) || (this.$v.formData.email.$dirty && !this.$v.formData.email.email)) {
        return 'danger'
      } else {
        return ''
      }
    },
    successPass: function () {
      if (!this.$v.formData.password.$invalid) {
        return 'success'
      } else if ((this.$v.formData.password.$dirty && !this.$v.formData.password.required) || (this.$v.formData.password.$dirty && !this.$v.formData.password.minLength)) {
        return 'danger'
      } else {
        return ''
      }
    },
    successName: function () {
      if (!this.$v.formData.name.$invalid) {
        return 'success'
      } else if ((this.$v.formData.name.$dirty && !this.$v.formData.name.required)) {
        return 'danger'
      } else {
        return ''
      }
    },
    successConfirmPass: function () {
      if (!this.$v.formData.confirmPassword.$invalid) {
        return 'success'
      } else if ((this.$v.formData.confirmPassword.$dirty && !this.$v.formData.confirmPassword.required) || (this.$v.formData.confirmPassword.$dirty && !this.$v.formData.confirmPassword.password)) {
        return 'danger'
      } else {
        return ''
      }
    },
    error () {
      return this.error
    },
    ...mapGetters(['countries', 'cities', 'error'])
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
  },
  validations: {
    formData: {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(8) },
      confirmPassword: {
        pass: sameAs('password'),
        required
      },
      country: { required },
      city: { required }
    }
  },
  methods: {
    nextStep () {
      switch (this.step) {
        case 1:
          if (this.$v.formData.name.$invalid || this.$v.formData.email.$invalid) {
            this.$v.formData.name.$touch()
            this.$v.formData.email.$touch()
            return
          }
          this.step++
          break
        case 2:
          if (this.$v.formData.password.$invalid || this.$v.formData.confirmPassword.$invalid) {
            this.$v.formData.password.$touch()
            this.$v.formData.confirmPassword.$touch()
            return
          }
          this.step++
          break
      }
    },
    async onSubmit () {
      if (this.$v.formData.$invalid) {
        this.$v.formData.$touch()
        return
      }
      const formData = this.formData
      try {
        await this.register(formData)
        this.$router.push('/home?message=register')
      } catch (error) {}
    },
    ...mapActions(['register'])
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
