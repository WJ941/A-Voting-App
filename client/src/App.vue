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
  },
  mounted () {
    this.setState() // trying to get login user info
    var that = this
    window.addEventListener('storage', (event) => {
      if (event.key === 'getSessionStorage') {
        localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage))
        localStorage.removeItem('sessionStorage')
      } else if (event.key === 'sessionStorage' && !sessionStorage.length) {
        var data = JSON.parse(event.newValue)
        for (let key in data) {
          sessionStorage.setItem(key, data[key])
        }
      } else if (event.key === 'isUserLoggedin') {
        console.log(event.key, event.newValue)
        that.setState()
      }
    })
  },
  methods: {
    async setState () {
      if (!sessionStorage.getItem('user') && !sessionStorage.getItem('token')) {
        localStorage.setItem('getSessionStorage', Date.now())
      } else if (sessionStorage.getItem('user') && sessionStorage.getItem('token')) {
        this.$store.dispatch('setUser', JSON.parse(sessionStorage.getItem('user')))
        this.$store.dispatch('setToken', sessionStorage.getItem('token'))
      }
    }
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
