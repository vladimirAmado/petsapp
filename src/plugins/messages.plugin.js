export default {
  install (Vue, optinos) {
    Vue.prototype.$message = function (text) {
      this.$vs.notification({
        position: 'top-right',
        color: 'success',
        title: 'Уведомление',
        text: `${text}`
      })
    }

    Vue.prototype.$error = function (text) {
      this.$vs.notification({
        position: 'top-right',
        color: 'danger',
        title: 'Что-то пошло не так',
        text: `${text}`
      })
    }
  }
}
