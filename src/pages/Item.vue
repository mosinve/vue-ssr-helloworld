<template lang='pug'>
  .film-details
    div(v-if='item')
      nav(aria-label="breadcrumb")
        ol.breadcrumb
          li.breadcrumb-item
            router-link(:to="{ name: 'Index' }") Home
          li.breadcrumb-item.active(aria-current="page") {{item.attributes.canonicalTitle}}
      article
        h1 {{ item.attributes.canonicalTitle }}
        table.table
          tbody
            tr
              td: img( :src='item.attributes.posterImage.medium')
              td {{ item.attributes.synopsis }}
    .text-center(v-else)
      font-awesome-icon( icon="spinner" size="6x" spin)
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Item',

    async asyncData({ store, route }) {
      await store.dispatch('fetchItem', { id: route.params.id })
    },

    computed: mapState(['item'])
  }
</script>
