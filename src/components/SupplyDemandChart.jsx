import * as d3 from "d3"
import Axis from "./charts/Axis"
import Chart from "./charts/Chart"
import React, { Component } from "react"

export default class SupplyDemandChart extends Component {
  render() {
    const fullWidth = 1680
    const fullHeight = 720
    const margin = { top: 20, right: 20, bottom: 30, left: 50 }
    const width = fullWidth - margin.left - margin.right
    const height = fullHeight - margin.top - margin.bottom

    var x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
    var y = d3.scaleLinear().range([height, 0])

    const selectX = d => d.timestamp
    const selectY = d => d.sellingPrice

    const scaleX = d => x(selectX(d))
    const scaleY = d => y(selectY(d))

    const xAxis = d3
      .axisBottom()
      .scale(x)
      .tickFormat(d3.timeFormat("%B %Y"))
    const yAxis = d3
      .axisLeft()
      .scale(y)
      .ticks(5)

    x.domain(
      this.props.data.map(function(d) {
        return d.timestamp
      })
    )
    y.domain([
      0,
      d3.max(this.props.data, function(d) {
        return d.sellingPrice
      })
    ])

    // svg
    //   .append("g")
    //   .attr("class", "x axis")
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(xAxis)
    //   .selectAll("text")
    //   .style("text-anchor", "end")
    //   .attr("dx", "-.8em")
    //   .attr("dy", "-.55em")
    //   .attr("transform", "rotate(-90)")

    // svg
    //   .append("g")
    //   .attr("class", "y axis")
    //   .call(yAxis)
    //   .append("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr("y", 6)
    //   .attr("dy", ".71em")
    //   .style("text-anchor", "end")
    //   .text("Value ($)")

    // svg
    //   .selectAll("bar")
    //   .data(data)
    //   .enter()
    //   .append("rect")
    //   .style("fill", "steelblue")
    //   .attr("x", function(d) {
    //     return x(d.date)
    //   })
    //   .attr("width", x.rangeBand())
    //   .attr("y", function(d) {
    //     return y(d.value)
    //   })
    //   .attr("height", function(d) {
    //     return height - y(d.value)
    //   })

    return (
      <Chart
        id="shark-supply-demand"
        width={fullWidth}
        height={fullHeight}
        margin={margin}
      >
        <Axis
          type="x"
          axis={xAxis}
          style={{ transform: `translateY(${height}px)` }}
        />
        <Axis type="y" axis={yAxis} />
      </Chart>
    )
  }
}
