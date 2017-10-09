<template>
  <div class="pt-5" >
    <svg id="svg" width="350" height="350">
    </svg>
  </div>
</template>

<script>
import createPieChart from '@/utilities/createPieChart'
export default {
  data () {
    return {}
  },
  props: ['options'],
  mounted () {
    var optinsData = []
    this.options.forEach((option, index) => {
      optinsData[index] = option.value
    })
    console.log('pie chart data', this.options)
    createPieChart.createPieChart(optinsData, '#svg')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
