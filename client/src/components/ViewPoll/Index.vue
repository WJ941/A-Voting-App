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
          item-value="text"
        ></v-select>
        <div>
         <v-btn block color="primary">Submit</v-btn>
         <v-btn block color="primary">Share On Twitter</v-btn>
         </div>
      </v-flex>
      <v-flex xs12 sm8>
        <pie-chart :options="poll.options"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import PollService from '@/service/PollService'
import PieChart from './Piechart'
export default {
  data () {
    return {
      e1: null,
      poll: {
        title: '',
        options: []
      }
    }
  },
  async mounted () {
    const pollId = this.$route.params.pollId
    const data = (await PollService.getPoll(pollId)).data
    this.poll.title = data[0].Poll.title
    data.forEach((x) => {
      this.poll.options.push(x.Option)
    })
  },
  components: {
    PieChart
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
