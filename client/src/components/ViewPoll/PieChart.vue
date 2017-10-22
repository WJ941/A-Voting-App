<template>
  <div class = 'container'></div>
</template>

<script>
const d3 = require('d3')
export default {
  data () {
    return {
    }
  },
  props: ['options'],
  // options: [
  //   {
  //     text: 'a',
  //     value: 3
  //   },
  //   {
  //     text: 'b',
  //     value: 3
  //   }
  // ]
  mounted () {
    this.width = 350
    this.height = 350
    this.radius = Math.min(this.width, this.height) * 0.8 / 2
    this.arc = d3
      .arc()
      .innerRadius(this.radius / 2)
      .outerRadius(this.radius)
    this.svg = d3
      .select(this.$el)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
    this.pieParent = this.svg
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)
  },
  watch: {
    options () {
      this.drawChart(this.options)
    }
  },
  methods: {
    drawChart (data) {
      let that = this
      let drawData = d3.pie().value((d) => d.value)(data)
      let colorScale = d3.scaleOrdinal().domain(d3.range(0, data.length)).range(d3.schemeCategory20c)
      let piePaths = this.pieParent.selectAll('path')
      if (piePaths.size() === 0) {
        piePaths = piePaths
          .data(drawData)
          .enter()
          .append('path')
      }
      piePaths
        .data(drawData)
        .attr('fill', (d, i) => colorScale(i))
        .attr('d', d => this.arc(d))
      var STYLE_MODULE_NAME = this.$el.attributes[0].name
      let textContainer = d3
        .select(this.$el)
        .append('div')
        .style('position', 'absolute')
        .style('opacity', 0)
      let textContent = textContainer
        .append('div')
        .attr('class', 'tooltip')
        .attr(STYLE_MODULE_NAME, '')
      textContainer
        .append('div')
        .attr('class', 'triangle')
        .attr(STYLE_MODULE_NAME, '')
      this.pieParent
        .selectAll('path')
        .data(drawData)
        .on('mouseenter', function (d, i) {
          textContent.text(d.data.text + ':' + d.data.value)
          let xandy = that.arc.centroid(d)
          let x = xandy[0]
          let y = xandy[1]
          let textWidth = textContainer.style('width').replace('px', '')
          let textHeight = textContainer.style('height').replace('px', '')
          textContainer
            .style('opacity', 1)
            .style('top', y + that.height / 2 - textHeight + 'px')
            .style('left', x + that.width / 2 - textWidth / 2 + 'px')
        })
        .on('mouseleave', function () {
          textContainer.style('opacity', 0)
        })
        // --------tag bar -----------
      let x = d3.scalePoint()
        .rangeRound([0, this.width]).padding(0.9)
        .domain(data.map(d => d.text))
      let tagbar = d3.select(this.$el).select('#tagbar')
      if (tagbar.size() === 0) {
        tagbar = d3
        .select(this.$el)
        .append('svg')
        .attr('id', 'tagbar')
        .attr('width', this.width)
        .attr('height', '20')
      }
      tagbar.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => x(d.text))
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('width', '20')
        .attr('height', '20')
        .attr('fill', (d, i) => colorScale(i))
      tagbar.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('height', '20')
        .text((d) => d.text)
        .attr('font-size', 16)
        .attr('x', d => x(d.text) + 30)
        .attr('y', 16)
    }
  }// methods
}// export default
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  box-sizing: border-box;
}
.container {
  position: relative;
  margin: 0;
  height: 350px;
  width: 350px;
  margin-left: auto;
  margin-right: auto;
}
.tooltip{
  height: auto;
  font-family: simsun;
  font-size: 14px;
  text-align: center;
  border-style: solid;
  border-width: 0px;
  border-radius: 10px;
  padding: 2px 10px;
  background-color: black;
  color: white;
  width:fit-content;
  margin-left: auto;
  margin-right: auto;
}
.triangle {
  border-left: 6px transparent solid;
  border-right: 6px transparent solid;
  border-top: 10px solid black;
  border-bottom: 0px;
  width: 0px;
  margin-left: auto;
  margin-right: auto;
}
</style>
