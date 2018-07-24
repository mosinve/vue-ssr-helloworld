<template>
  <div>
    <article v-if='item'>
      <h1>{{ item.attributes.canonicalTitle }}</h1>
      <table>
        <tbody>
        <tr>
          <td><img :src='item.attributes.posterImage.medium'></td>
          <td>{{ item.attributes.synopsis }}</td>
        </tr>
        </tbody>
      </table>
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
