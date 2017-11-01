<template>
  <div class="pt-5">
    <h3>The is callback page</h3>
  </div>
</template>

<script>
import Authentication from '@/service/Authentication'
export default {
  data () {
    return {
    }
  },
  async mounted () {
    let search = location.search
    this.userInfo = (await Authentication.getUserInfo(search)).data
    const {email, login} = this.userInfo
    if (email && login) {
      const response = (await Authentication.signinGithub({
        email: email,
        username: login
      })).data
      // this.$store.dispatch('setToken', response.token)
      // this.$store.dispatch('setUser', response.user)
      window.localStorage.setItem('user', JSON.stringify(response.user))
      window.localStorage.setItem('token', response.token)
      console.log('storage changed')
      window.close()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
