<template>
  <div class="pt-5">
    <v-layout row wrap>
      <v-flex xs12 sm4 class="text-sm-left pl-4">
        <h5>{{poll.title}}</h5>
        <strong>I'd like to vote for...:</strong>
        <v-select
          v-bind:items="poll.options"
          label="Choose an option..."
          bottom
          item-value="id"
          v-model="newOptionId"
        ></v-select>
        <div>
          <v-btn
            block
            class="primary"
            @click="submit"
          >Submit</v-btn>
          <v-btn
            block
            class="blue lighten-2"
            @click="shareTwt"
          >Share On Twitter</v-btn>
         </div>
      </v-flex>
      <v-flex xs12 sm8 class="pl-6">
        <pie-chart :options="poll.options"/>
      </v-flex>
      <v-flex xs12 sm8 offset-sm4 mt-5>
        <v-btn
          style="width:350px"
          class="error"
          @click="deletePoll"
          v-if="this.$store.state.user && this.poll.UserId === this.$store.state.user.id"
        >delete poll</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import PollService from '@/service/PollService'
import optionService from '@/service/optionService'
import PieChart from './PieChart.vue'
export default {
  data () {
    return {
      e1: null,
      poll: {
        title: '',
        options: [],
        UserId: null
      },
      newOptionId: null
    }
  },
  async mounted () {
    this.updatePoll()
  },
  components: {
    PieChart
  },
  methods: {
    async submit () {
      const pollId = this.$route.params.pollId
      if (this.newOptionId) {
        let newOption = this.poll.options.filter((x) => x.id === this.newOptionId)
        if (newOption.length) {
          newOption = newOption[0]
          newOption = ({
            text: newOption.text,
            value: newOption.value + 1
          })
          let newObj = {
            optionId: this.newOptionId,
            pollId: pollId,
            option: newOption
          }
          try {
            await optionService.update(newObj)
            this.updatePoll()
          } catch (err) {
            console.log(err)
          }
        }
      } else {
        alert('You must choose a option to vote for')
      }
    },
    async updatePoll () {
      const pollId = this.$route.params.pollId
      const data = (await PollService.index({
        pollId: pollId
      })).data
      console.log(data)
      this.poll.title = data.options[0].Poll.title
      this.poll.options = data.options.map(x => x.Option)
      this.poll.UserId = data.user[0].UserId
    },
    shareTwt () {
      const curHref = location.href
      const text = this.poll.title
      const twtShareUrl = 'https://twitter.com/intent/tweet'
      var newwindow = window.open(encodeURI(twtShareUrl + '?text=' + text + '&url=' + curHref))
      newwindow.opener = null
    },
    async deletePoll () {
      if (window.confirm('Do you really want to delete this poll?') && this.$store.state.user) {
        const pollId = this.$route.params.pollId
        const userId = this.$store.state.user.id
        await PollService.deletePoll({pollId: pollId, userId: userId})
        window.alert("You've succeed deleted this poll.")
        window.location.replace('/polls')
      } else {
        console.log('not login')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding: 0px;
}
</style>
