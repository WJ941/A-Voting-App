<template>
  <div class="pt-5">
    <h3>fcc-voting</h3>
    <p>Below are polls hosted by fcc-voting.</p>
    <p>Select a poll to see the results and vote, or sign-in to make a new poll.</p>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-card>
          <v-list>
            <v-list-group v-for="poll in polls" :key="poll.id">
              <v-list-tile
                slot="item"
                :to="{
                  name: 'view-poll',
                  params: {
                    pollId: poll.id
                  }
                }"
                @click.stop=''>
                <v-list-tile-content>
                  <v-list-tile-title class="text-sm-center"
                  >{{ poll.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import PollService from '../service/PollService'
export default {
  data () {
    return {
      polls: null
    }
  },
  async mounted () {
    this.polls = (await PollService.index()).data
  },
  methods: {
    navigatedTo (args) {
      this.$router.push(args)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
