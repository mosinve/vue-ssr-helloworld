<template>
  <div>
    <article v-if='item'>
      <h1>{{ item.attributes.canonicalTitle }}</h1>
      <img :src='item.attributes.posterImage.large'>
    </article>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Item',

    asyncData({ store, route }) {
      return store.dispatch('fetchItem', { id: route.params.id })
    },

    computed: mapState(['item'])
  }
</script>

<style scoped>

</style>
