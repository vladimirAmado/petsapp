export default {
  state: {
    cities: [],
    countries: []
  },
  mutations: {
    setCities (state, cities) {
      state.cities = cities
    },
    setCountries (state, countries) {
      state.countries = countries
    }
  },
  actions: {
    fetchCities ({ dispatch, commit }) {
      fetch('https://vladimiramado.github.io/data/cities.json')
        .then(response => response.json())
        .then(json => {
          commit('setCities', json)
        })
    },
    fetchCountries ({ dispatch, commit }) {
      fetch('https://vladimiramado.github.io/data/countries.json')
        .then(response => response.json())
        .then(json => {
          commit('setCountries', json)
        })
    }
  },
  getters: {
    countries: s => s.countries.sort((a, b) => a.name.localeCompare(b.name)),
    cities: s => s.cities.sort((a, b) => a.name.localeCompare(b.name))
  }
}
