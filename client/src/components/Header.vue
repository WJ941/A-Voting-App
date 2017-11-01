<template>
  <v-container class="nopd">
  <v-toolbar>
    <v-toolbar-title>fcc-Voting</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        flat
        :to="{
          name: 'polls'
        }"
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
      >New Polls</v-btn>
      <v-menu offset-y v-if="$store.state.isUserLoggedIn">
        <v-btn class="primary--text"  slot="activator">{{$store.state.user.username}}</v-btn>
        <v-list>
          <v-list-tile v-for="item in items" :key="item.title" @click="">
            <v-list-tile-title @click="logout">log out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
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
      ]
    }
  },
  methods: {
    async loginGithub () {
      let res = (await Authentication.loginGithub()).data
      // window.location = res.data // get the path including client id and then redirecting to github authentication page.
      window.open(res)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
    },
    async getMyPolls () {
      this.$store.dispatch('setPolls', true)
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
</style>
