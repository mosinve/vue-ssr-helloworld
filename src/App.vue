<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  title: 'HelloWorld',
  name: 'app'
}
</script>

<style lang="scss">
  @import "~bootstrap/dist/css/bootstrap.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
