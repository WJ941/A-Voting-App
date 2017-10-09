<template>
  <div id="app">
    <v-app >
      <page-header/>
        <v-container grid-list-md text-xs-center class="grey lighten-3 mt-3 pb-5">
          <router-view></router-view>
        </v-container>
      <page-footer/>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
import PageFooter from '@/components/Footer.vue'
export default {
  name: 'app',
  components: {
    PageHeader, PageFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
