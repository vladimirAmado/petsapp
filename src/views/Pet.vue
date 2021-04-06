<template>
    <section class="pet">
        <form v-on:submit.prevent="onSubmit()" class="form-pet">
          <div class="form-pet__container">
            <div class="inputs">
              <input
                class="input"
                type="text"
                name="name"
                id="name"
                v-model="name"
                :class="{
                  'input_error': ($v.name.$dirty && !$v.name.required),
                  'input_correct': !$v.name.$invalid
                }"
              >
              <label class="label" :class="{'label_active': $v.name.$model}" for="name">Имя</label>
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
                Тип питомца
              </label>
            </div>
            <div class="inputs">
              <input type="file" name="file" id="file" ref="file" accept="image/*" v-on:change="handleFileUpload()">
            </div>
            <div class="inputs">
              <input
                :class="{
                  'input_error': ($v.type.$dirty && !$v.type.required),
                  'input_correct': !$v.type.$invalid
                }"
                class="input"
                type="text"
                name="type"
                id="type"
                v-model="type"
              >
              <label class="label" :class="{'label_active': $v.type.$model}"  for="type">Парода</label>
            </div>
            <div class="inputs">
              <textarea
                class="input"
                name="description"
                id="description"
                v-model="description"
                :class="{
                  'input_error': ($v.description.$dirty && !$v.description.required),
                  'input_correct': !$v.description.$invalid
                }"
              />
              <label class="label" :class="{'label_active': $v.description.$model}" for="description">Описание</label>
            </div>
            <div class="inputs">
              <input
                :class="{
                  'input_error': ($v.birthdate.$dirty && !$v.birthdate.required),
                  'input_correct': !$v.birthdate.$invalid
                }"
                type='date'
                class="input"
                name="birthdate"
                id="birthdate"
                v-model="birthdate"
              />
              <label class="label label_active" for="birthdate">Дата рождения</label>
            </div>
            <div class="inputs">
              <input
                type='number'
                step="0.1"
                max="100"
                min="0.1"
                class="input"
                name="weigth"
                id="weigth"
                v-model="weight"
                :class="{
                  'input_error': ($v.weight.$dirty && !$v.weight.required),
                  'input_correct': !$v.weight.$invalid
                }"
              />
              <label class="label" :class="{'label_active': $v.weight.$model}" for="weight">Вес</label>
            </div>
            <div class="inputs inputs-switch">
              <label for="switch">Пол</label>
              <vs-switch v-model="sex">
                <template #off>
                    <i class='bx bx-male-sign'></i>
                </template>
                <template #on>
                    <i class='bx bx-female-sign'></i>
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
          <button class="btn btn_secondary">Add a pet</button>
          </div>
        </form>
    </section>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { required, numeric, between, minLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import firebase from 'firebase/app'

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
    group: '',
    type: '',
    name: '',
    file: '',
    description: '',
    birthdate: '',
    weight: '',
    sex: false,
    country: '',
    city: ''
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
    weight: {
      numeric,
      required,
      between: between(0, 100)
    },
    sex: { required },
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
      return this.cities.filter(city => city.country_code === this.country.code)
    },
    ...mapGetters(['countries', 'cities'])
  },
  methods: {
    handleFileUpload () {
      this.imageData = this.$refs.file.files[0]
      this.onUpload()
    },
    onUpload () {
      this.picture = null
      const storageRef = firebase.storage().ref(`/images/${this.imageData.name}`).put(this.imageData)
      storageRef.on('state_changed', snapshot => {
        this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, error => { console.log(error.message) },
      () => {
        this.uploadValue = 100
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.file = url
        })
      })
    },
    async onSubmit () {
      const formData = {
        name: this.name,
        age: this.birthdate,
        location: this.location,
        sex: this.sex,
        weight: this.weight,
        type: this.type,
        groupID: this.group,
        about: this.description,
        img: this.file
      }
      try {
        await this.$store.dispatch('addAnimal', formData)
        this.$v.$reset()
      } catch (error) {}
    }
  }
}
</script>
