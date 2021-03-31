<template>
    <section class="pet">
        <form v-on:submit.prevent="onSubmit()" class="form-pet">
          <div class="form-pet__container">
            <div class="inputs">
              <input class="input" type="text" name="name" id="name" v-model="name">
              <label class="label" :class="{'label_active': $v.name.$model}" for="name">Name</label>
            </div>
            <div class="inputs">
              <v-select
                :class="{
                  'input_error': ($v.group.$dirty && !$v.group.required),
                  'input_correct': !$v.group.$invalid
                }"
                v-model="group"
                :options="groups"
                :reduce="group => group.id"
                label="name">
              </v-select>
              <label
                :class="{'label_active': $v.group.$model}"
                class="register-form__label label"
                for="group">
                group
              </label>
            </div>
            <div class="inputs">
              <input class="input" type="text" name="type" id="type" v-model="type">
              <label class="label" :class="{'label_active': $v.type.$model}"  for="type">Type</label>
            </div>
            <div class="inputs">
              <textarea class="input" name="description" id="description" v-model="description"/>
              <label class="label" :class="{'label_active': $v.description.$model}" for="description">Description</label>
            </div>
            <div class="inputs">
              <input type='date' class="input" name="birthdate" id="birthdate" v-model="birthdate"/>
              <label class="label label_active" for="birthdate">Birthdate</label>
            </div>
            <div class="inputs">
              <input type='number' step="0.1" max="100" class="input" name="weigth" id="weigth" v-model="weigth"/>
              <label class="label" :class="{'label_active': $v.weigth.$model}" for="weigth">Weigth</label>
            </div>
            <div class="inputs">
              <vs-switch v-model="sex">
                <template #off>
                    male
                </template>
                <template #on>
                    female
                </template>
              </vs-switch>
            </div>
             <div class="inputs">
              <v-select name='country' :class="{'input_error': ($v.country.$dirty && !$v.country.required), 'input_correct': !$v.country.$invalid}" v-model="country" :options="countries" :reduce="country => ({ code: country.code, name: country.name })" label="name"></v-select>
              <label
                :class="{'label_active': $v.country.$model}"
                class="label"
                for="country">
                Выберите страну
              </label>
            </div>
            <div class="inputs">
              <v-select :class="{'input_error': ($v.city.$dirty && !$v.city.required), 'input_correct': !$v.city.$invalid}" v-model="city" :options="sortedCities" :reduce="city => ({ code: city.country_code, name: city.name })" label="name"></v-select>
              <label
                :class="{'label_active': $v.city.$model}"
                class="label"
                for="country">
                Выберите город
              </label>
            </div>
          <button class="btn btn_rounded">Add a pet</button>
          </div>
        </form>
    </section>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { required, numeric, between, minLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'PetForm',
  data: () => ({
    groups: [
      {
        name: 'Dog',
        id: 1
      },
      {
        name: 'Cat',
        id: 2
      },
      {
        name: 'Bird',
        id: 3
      },
      {
        name: 'Rabbit',
        id: 4
      },
      {
        name: 'Hamster',
        id: 5
      }
    ],
    group: 2,
    type: 'Шотландский вислоухий',
    name: 'БОБ',
    description: 'Любит спать, кушать и вставать в всратые позы',
    birthdate: '2019-02-13',
    weigth: 3,
    switch: false,
    img: '',
    country: {
      code: 'RU',
      name: 'Россия'
    },
    city: {
      code: 'RU',
      name: 'Пермь'
    }
  }),
  validations: {
    group: { required },
    type: { required },
    name: {
      required,
      minLength: minLength(3)
    },
    description: { required },
    birthdate: { required },
    weigth: {
      numeric,
      required,
      between: between(0, 100)
    },
    switch: { required },
    city: { required },
    country: { required }
  },
  watch: {
    country: function () {
      if (this.country === null) {
        this.country = ''
        this.city = ''
      }
    }
  },
  computed: {
    location () {
      return this.country.name + ', ' + this.city.name
    },
    sortedCities () {
      return [...this.cities].filter(city => city.country_code === this.country.code)
    },
    ...mapGetters(['countries', 'cities'])
  },
  methods: {
    sex () {
      if (!this.switch) {
        return 'Male'
      } else {
        return 'Female'
      }
    },
    async onSubmit () {
      const formData = {
        name: this.name,
        age: this.birthdate,
        location: this.location,
        sex: this.sex(),
        weigth: this.weigth,
        type: this.type,
        groupID: this.group,
        about: this.description,
        img: this.img
      }
      console.log(formData)
      try {
        await this.$store.dispatch('addAnimal', formData)
      } catch (error) {}
    }
  }
}
</script>
