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
    this.response = (await Authentication.getUserInfo(query)).data
    sessionStorage.setItem('user', JSON.stringify(this.response.user))
    sessionStorage.setItem('token', this.response.token)
    localStorage.setItem('isUserLoggedin', Date.now())
    console.log('storage changed')
    window.close()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
