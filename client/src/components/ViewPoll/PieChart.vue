<template>
  <div id="pieChart"></div>
</template>

<script>
const d3 = require('d3')
export default {
  data () {
    return {}
  },
  props: ['options'],
  watch: {
    options: function () {
      let [width, height] = [350, 350]
      let data = this.options
      let radius = Math.min(width, height) * 0.8 / 2
      let arc = d3.arc().innerRadius(radius / 2).outerRadius(radius)
      let drawData = d3.pie().value((d) => d.value)(data)
      let colorScale = d3.scaleOrdinal().domain(d3.range(0, data.length)).range(d3.schemeCategory20c)
  // ------
      d3.selectAll('#pieChart *').remove()
      let svg = d3
        .select('#pieChart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      let pathParent = svg.append('g')
      pathParent
        .selectAll('path')
        .data(drawData)
        .enter()
        .append('path')
        .attr('d', x => arc(x))
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
        .attr('fill', (d, i) => colorScale(i))
        .attr('transform', `translate(${width / 2}, ${height / 2})`)

      let textContainer = d3
        .select('#pieChart')
        .append('div')
        .style('position', 'absolute')
        .style('opacity', 0)
      let textContent = textContainer
        .append('div')
        .attr('class', 'tooltip')
      textContainer
        .append('div')
        .attr('class', 'triangle')
      pathParent
        .selectAll('path')
        .data(drawData)
        .on('mouseenter', function (d, i) {
          textContent.text(d.data.text + ':' + d.data.value)
          let xandy = arc.centroid(d)
          let x = xandy[0]
          let y = xandy[1]
          let textWidth = textContainer.style('width')
          let textHeight = textContainer.style('height')
          textContainer
            .style('opacity', 1)
            .style('top', y + height / 2 - textHeight.replace('px', '') + 'px')
            .style('left', x + width / 2 - textWidth.replace('px', '') / 2 + 'px')
        })
        .on('mouseleave', function () {
          textContainer.style('opacity', 0)
        })
      let tagbar = d3
        .select('#pieChart')
        .append('svg')
        .attr('width', width)
      tagbar.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 40 + (width - data.length * 40) / 2)
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
        .attr('x', (d, i) => (2 * i + 1) * 20 + (width - data.length * 40) / 2)
        .attr('y', 16)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  box-sizing: border-box;
}
#pieChart{
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
