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
    let query = location.search
    this.userInfo = (await Authentication.getUserInfo(query)).data
    const {email, login} = this.userInfo
    if (email && login) {
      const response = (await Authentication.signinGithub({
        email: email,
        username: login
      })).data
      sessionStorage.setItem('user', JSON.stringify(response.user))
      sessionStorage.setItem('token', response.token)
      localStorage.setItem('userLoggedin', Date.now())
      console.log('storage changed')
      window.close()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
