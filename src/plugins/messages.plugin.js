export default {
  install (Vue, optinos) {
    Vue.prototype.$message = function (text) {
      this.$vs.notification({
        position: 'top-right',
        color: 'success',
        title: 'Успех',
        text: `${text}`
      })
    }

    Vue.prototype.$error = function (text) {
      this.$vs.notification({
        position: 'top-right',
        color: 'danger',
        title: 'Ошибка',
        text: `${text}`
      })
    }
  }
}
