<template lang='pug'>
  .row
    .col.text-center(v-if = 'items.length === 0'): font-awesome-icon( icon='spinner' size='6x' spin)
    template( v-else)
      router-link( v-for='item in items'
      :to = '{ name: "Item", params: { id: item.id }}'
      append
      :key = 'item.id')
        img.img-thumbnail( :src='item.attributes.posterImage.small')
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Index',

  asyncData({ store }) {
    return store.dispatch('fetchList')
  },

  computed: mapState(['items'])
}
</script>
