<template>
  <section class="form-section">
    <div class="form-image__wrap">
      <img
        src="../assets/images/Animal.svg"
        alt=""
      >
    </div>
    <form
      class="login-form"
      v-on:submit.prevent="onSubmit()"
    >
      <div class="login-form__container">
        <div class="inputs">
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
        <div class="inputs">
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
              v-if="($v.password.$dirty && !$v.password.required)"
              #message-danger
            >
              Required
            </template>
          </vs-input>
        </div>
        <vs-button
          color="#ff5f54"
          class="btn"
        >
          Sign in
        </vs-button>
        <router-link
          to="/register"
          class="form__bottom-link"
        >
          Don't have account? Sign up
        </router-link>
      </div>
    </form>
  </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import messages from '@/plugins/messages'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    hasVisiblePassword: false
  }),
  watch: {
    error (e) {
      this.$error(messages[e.code])
    }
  },
  computed: {
    error () {
      return this.error
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
      } else if ((this.$v.password.$dirty && !this.$v.password.required)) {
        return 'danger'
      } else {
        return ''
      }
    },
    ...mapGetters(['error'])
  },
  validations: {
    email: { required, email },
    password: { required }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message] || 'Непредсказуемый какой чорт!')
    }
  },
  methods: {
    async onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.login(formData)
        this.$router.push('/home?message=login')
      } catch (error) {}
    },
    ...mapActions(['login'])
  }
}
</script>
