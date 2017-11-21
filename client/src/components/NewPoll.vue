<template>
  <div class="pt-5">
    <h3>Create a new poll</h3>
    <v-form ref="form" lazy-validation>
      <v-text-field
        label="Title"
        v-model="title"
        :counter="10"
        required
      ></v-text-field>
      <v-text-field
        label="Options (Seperated by line)"
        v-model="options"
        required
        multi-line
      ></v-text-field>
      <v-btn
        @click="submit"
        :disabled="!valid"
      >
        submit
      </v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-form>
  </div>
</template>

<script>
import PollService from '@/service/PollService'
export default {
  data () {
    return {
      title: null,
      options: ''
    }
  },
  computed: {
    valid () {
      return this.title && this.optionsObjArr.length
    },
    optionsObjArr () {
      var arr = this.options.split('\n').filter(n => n)
      return arr.map(x => Object({text: x, value: 1}))
    }
  },
  methods: {
    clear () {
      this.title = null
      this.options = ''
    },
    // create new poll
    async submit () {
      const userId = this.$store.state.user.id
      const obj = {
        userId: userId,
        title: this.title,
        options: this.optionsObjArr
      }
      var res = (await PollService.post(obj)).data
      // navigate to the newly created poll
      this.$router.push({
        name: 'view-poll',
        path: '/poll/:pollId',
        params: {
          pollId: res.poll.id
        }
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
