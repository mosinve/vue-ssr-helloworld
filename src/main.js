import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.config.productionTip = false

library.add(faSpinner)
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.mixin({
  beforeMount () {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

// экспортируем функцию фабрику для создания экземпляров
// нового приложения, маршрутизатора и хранилища
export function createApp () {
  // Создаём экземпляры маршрутизатора и хранилища Vuex
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    // корневой экземпляр просто рендерит компонент App
    render: h => h(App)
  })
  return { app, router, store }
}
