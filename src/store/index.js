// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Предположим, что у нас есть универсальный API,
// который возвращает Promises и опустим детали реализации
import api from '../api'

export function createStore () {
  return new Vuex.Store({
    state: {
      items: {},
      item: null
    },
    actions: {
      async fetchList ({ commit }, { filters } = {}) {
        // возвращаем Promise через `store.dispatch()`
        // чтобы мы могли понять когда данные будут загружены
        const { data: { data: items} } = await api.getList({ filters })
        commit('setItems', { items })
      },
      async fetchItem ({ commit }, { id }) {
        commit('clearItem')
        const { data: { data: item } } = await api.getItem({ id })
        commit('setItem', { item })
      }
    },
    mutations: {
      setItems (state, { items }) {
        state.items = items
      },
      clearItem(state) {
        state.item = null
      },
      setItem (state, { item }) {
        state.item = item
      }
    }
  })
}
