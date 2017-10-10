const d3 = require('d3')
import 'd3-selection-multi'
export default {
  createPieChart (arr, id) {
    let percentage
    let colors = ['steelblue', 'cyan', 'lime', 'teal', 'navy']
    let r = 150
    let strokeWidth = 50
    let perimeter = r * 3.14 * 2
    let sum = function () {
      return Array.prototype.reduce.call(this, function (sum, value) {
        return sum + value
      }, 0)
    }

    let svg = d3.select(id)
    let circle = svg.selectAll('circle')
      .data(arr)
    circle.exit().remove()
    circle.enter().append('circle')
      .merge(circle)
      .attrs({
        cx: r + strokeWidth / 2,
        cy: r + strokeWidth / 2,
        r: r,
        'stroke-width': strokeWidth,
        fill: 'none'
      })
    .attrs({
      'stroke-dasharray': (d, i) => {
        percentage = d / (sum.apply(arr))
        return perimeter * percentage + ',' + perimeter * (1 - percentage)
      },
      stroke: (d, i) => {
        return colors[i]
        // return "hsb(" + Math.random()   + ", 1, 1)";
        // return 'hsl(' + Math.random() * 360 + ',100%,50%)'
      },
      transform: (d, i) => {
        let rotateAngle
        if (arr.slice(0, i)) {
          rotateAngle = 360 * sum.apply(arr.slice(0, i)) / sum.apply(arr)
        } else {
          rotateAngle = 0
        }
        return `rotate(${rotateAngle},175,175)`
      }
    })
  }
}
