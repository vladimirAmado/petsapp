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
                v-model="formData.name"
                :class="{
                  'input_error': ($v.formData.name.$dirty && !$v.formData.name.required),
                  'input_correct': !$v.formData.name.$invalid
                }"
              >
              <label class="label" :class="{'label_active': $v.formData.name.$model}" for="name">Имя</label>
            </div>
            <div class="inputs">
              <v-select
                :class="{
                  'input_error': ($v.formData.group.$dirty && !$v.formData.group.required),
                  'input_correct': !$v.formData.group.$invalid
                }"
                v-model="formData.group"
                :options="groups"
                :reduce="group => group.id"
                label="name">
              </v-select>
              <label
                :class="{'label_active': $v.formData.group.$model}"
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
                  'input_error': ($v.formData.type.$dirty && !$v.formData.type.required),
                  'input_correct': !$v.formData.type.$invalid
                }"
                class="input"
                type="text"
                name="type"
                id="type"
                v-model="formData.type"
              >
              <label class="label" :class="{'label_active': $v.formData.type.$model}"  for="type">Парода</label>
            </div>
            <div class="inputs">
              <textarea
                class="input"
                name="description"
                id="description"
                v-model="formData.description"
                :class="{
                  'input_error': ($v.formData.description.$dirty && !$v.formData.description.required),
                  'input_correct': !$v.formData.description.$invalid
                }"
              />
              <label class="label" :class="{'label_active': $v.formData.description.$model}" for="description">Описание</label>
            </div>
            <div class="inputs">
              <input
                :class="{
                  'input_error': ($v.formData.birthdate.$dirty && !$v.formData.birthdate.required),
                  'input_correct': !$v.formData.birthdate.$invalid
                }"
                type='date'
                class="input"
                name="birthdate"
                id="birthdate"
                v-model="formData.birthdate"
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
                v-model="formData.weight"
                :class="{
                  'input_error': ($v.formData.weight.$dirty && !$v.formData.weight.required),
                  'input_correct': !$v.formData.weight.$invalid
                }"
              />
              <label class="label" :class="{'label_active': $v.formData.weight.$model}" for="weight">Вес</label>
            </div>
            <div class="inputs inputs-switch">
              <label for="switch">Пол</label>
              <vs-switch v-model="formData.sex">
                <template #off>
                    <i class='bx bx-male-sign'></i>
                </template>
                <template #on>
                    <i class='bx bx-female-sign'></i>
                </template>
              </vs-switch>
            </div>
             <div class="inputs">
              <v-select name='country' :class="{'input_error': ($v.formData.country.$dirty && !$v.formData.country.required), 'input_correct': !$v.formData.country.$invalid}" v-model="formData.country" :options="countries" :reduce="country => ({ code: country.code, name: country.name })" label="name"></v-select>
              <label
                :class="{'label_active': $v.formData.country.$model}"
                class="label"
                for="country">
                Выберите страну
              </label>
            </div>
            <div class="inputs">
              <v-select :class="{'input_error': ($v.formData.city.$dirty && !$v.formData.city.required), 'input_correct': !$v.formData.city.$invalid}" v-model="formData.city" :options="sortedCities" :reduce="city => ({ code: city.country_code, name: city.name })" label="name"></v-select>
              <label
                :class="{'label_active': $v.formData.city.$model}"
                class="label"
                for="country">
                Выберите город
              </label>
            </div>
            <vs-button
              color="#ff5f54"
              type="submit"
              class="btn btn_rounded"
            >
              Add a pet
            </vs-button>
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
    formData: {
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
    }
  }),
  validations: {
    formData: {
      group: { required },
      type: { required },
      name: {
        required,
        minLength: minLength(3)
      },
      description: { required },
      birthdate: {
        required
      },
      weight: {
        numeric,
        required,
        between: between(0, 100)
      },
      sex: { required },
      city: { required },
      country: { required }
    }
  },
  watch: {
    country: function () {
      if (this.formData.country === null) {
        this.formData.country = ''
        this.formData.city = ''
      }
    }
  },
  computed: {
    location () {
      return this.formData.country.name + ', ' + this.formData.city.name
    },
    sortedCities () {
      return this.cities.filter(city => city.country_code === this.formData.country.code)
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
      if (this.$v.formData.$invalid) {
        this.$v.formData.$touch()
        return
      }
      const formData = {
        name: this.formData.name,
        age: this.formData.birthdate,
        location: this.location,
        sex: this.formData.sex,
        weight: this.formData.weight,
        type: this.formData.type,
        groupID: this.formData.group,
        about: this.formData.description,
        img: this.file
      }
      try {
        await this.$store.dispatch('addAnimal', formData)
        this.formData = {
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
        }
        this.$v.formData.$reset()
      } catch (error) {}
    }
  }
}
</script>
