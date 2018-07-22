import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Index',
        component: () => import('../pages/Index.vue')
      },
      {
        path: ':id',
        name: 'Item',
        component: () => import('../pages/Item.vue')
      }
    ]
  })

}
