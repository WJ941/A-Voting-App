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
  watch: {
    options: function () {
      var optionsData = []
      this.options.forEach((option, index) => {
        optionsData[index] = option.value
      })
      createPieChart.createPieChart(optionsData, '#svg')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
svg:hover circle{
  border: 1px solid red;
}
</style>
