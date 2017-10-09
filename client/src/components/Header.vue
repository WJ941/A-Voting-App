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
        flat
        primary
        class="primary"
        :to="{
          path: 'https://twitter.com/'
        }"
      >Sign In With Twitter</v-btn>
      <v-btn
        flat
        v-if="$store.state.isUserLoggedIn"
      >My Polls</v-btn>
      <v-btn
        flat
        v-if="$store.state.isUserLoggedIn"
      >New Polls</v-btn>
      <v-btn
        flat
        v-if="$store.state.isUserLoggedIn"
      >user name</v-btn>
    </v-toolbar-items>
  </v-toolbar>
  </v-container>
</template>


<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nopd {
  padding: 0;
}
</style>
