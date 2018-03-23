<template>
  <v-container class="nopd">
  <v-toolbar>
    <v-toolbar-title>fcc-Voting</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn-toggle mandatory v-model="toggle_one">
      <v-btn
        flat
        @click="getPolls"
      >Home</v-btn>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        primary
        class="primary"
        @click='loginGithub'
      >Sign In With GitHub</v-btn>
      <v-btn
        flat
        v-if="$store.state.isUserLoggedIn"
        @click="getMyPolls"
      >My Polls</v-btn>
      <v-btn
        flat
        v-if="$store.state.isUserLoggedIn"
        @click="newPoll"
      >New Polls</v-btn>
      <v-menu offset-y v-if="$store.state.isUserLoggedIn">
        <v-btn class="primary--text" slot="activator">{{$store.state.user.nickname}}</v-btn>
        <v-list>
          <v-list-tile v-for="item in items" :key="item.title" @click="">
            <v-list-tile-title @click="logout">log out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-btn-toggle>
  </v-toolbar>
  </v-container>
</template>


<script>
import Authentication from '@/service/Authentication'
export default {
  data () {
    return {
      items: [
        { title: 'Log Out' }
      ],
      toggle_one: 0
    }
  },
  methods: {
    // get the path including client id and then redirecting to github authentication page.
    async loginGithub () {
      let path = (await Authentication.loginGithub()).data
      window.open(path, '_blank')
      // var newWindow = window.open(path, '_blank')
      // newWindow.opener = null
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
    },
    getMyPolls () {
      this.$store.dispatch('toGetMyPolls', Date.now())
      let userId = this.$store.state.user.id
      this.$router.push({
        path: `/polls?userId=${userId}`
      })
    },
    getPolls () {
      console.log('getpolls')
      this.$store.dispatch('toGetPolls', Date.now())
      this.$router.push({
        path: `/polls`
      })
    },
    newPoll () {
      this.$router.push({
        path: '/newPoll'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nopd {
  padding: 0;
}
.btn--raised {
  box-shadow: none;
}
.application--light .btn-toggle{
  height: 100%;
  background: none;
  box-shadow: none;
}
.btn {
  height: 100%;
}
.btn-toggle .btn {
  opacity: 1;
}
</style>
