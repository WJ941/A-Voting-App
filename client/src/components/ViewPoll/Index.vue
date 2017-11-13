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
         <v-btn block color="primary" @click="submit">Submit</v-btn>
         <v-btn block color="primary">Share On Twitter</v-btn>
         </div>
      </v-flex>
      <v-flex xs12 sm8 class="pl-6">
        <pie-chart :options="poll.options"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import PollService from '@/service/PollService'
import optionService from '@/service/optionService'
import PieChart from './Piechart'
export default {
  data () {
    return {
      e1: null,
      poll: {
        title: '',
        options: []
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
      this.poll.title = data[0].Poll.title
      this.poll.options = data.map(x => x.Option)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
