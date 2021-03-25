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
        <div class="login-form__inputs inputs">
          <input
            id="email"
            v-model.trim="email"
            class="login-form__input input"
            type="text"
            name="email"
            v-on:input="$v.email.$touch()"
            v-on:blur="$v.email.$touch()"
            :class="{'input_error': ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email ), 'input_correct': !$v.email.$invalid }"
          >
          <label
            :class="{'label_active': $v.email.$model}"
            class="login-form__label label"
            for="email"
          >E-mail</label>
        </div>
        <div class="login-form__inputs inputs">
          <input
            id="password"
            v-model.trim="password"
            class="login-form__input input"
            type="password"
            name="password"
            v-on:input="$v.password.$touch()"
            v-on:blur="$v.password.$touch()"
            :class="{'input_error': ($v.password.$dirty && !$v.password.required), 'input_correct': !$v.password.$invalid}"
          >
          <label
            :class="{'label_active': $v.password.$model}"
            class="login-form__label label"
            for="password"
          >Password</label>
        </div>
        <button
          type="submit"
          class="btn btn_rounded"
        >
          Sign in
        </button>
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
export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    loading: false
  }),
  validations: {
    email: { required, email },
    password: { required }
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
        await this.$store.dispatch('login', formData)
        this.$router.push('/Home')
      } catch (error) {}
    }
  }
}
</script>
