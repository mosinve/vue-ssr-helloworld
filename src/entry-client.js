import { createApp } from './main'
const { app, router, store } = createApp()

// Заполняем Store данными с сервера
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  app.$mount('#app')
})
