import * as d3 from "d3"
import Axis from "./charts/Axis"
import Chart from "./charts/Chart"
import Label from "./charts/Label"
import Line from "./charts/Line"
import React, { Component } from "react"

export default class PriceChart extends Component {
  render() {
    const [pWidth, pHeight] = this.props.size
    const margin = { top: 20, right: 20, bottom: 30, left: 50 }
    const width = pWidth - margin.left - margin.right
    const height = pHeight - margin.top - margin.bottom

    const x = d3
      .scaleTime()
      .domain(d3.extent(this.props.data, this.props.xMap))
      .rangeRound([0, width])
    const y = d3
      .scaleLinear()
      .domain(d3.extent(this.props.data, this.props.yMap))
      .rangeRound([height, 0])

    const scaleX = d => x(this.props.xMap(d))
    const scaleY = d => y(this.props.yMap(d))

    const xAxis = d3
      .axisBottom()
      .scale(x)
      .tickFormat(d3.timeFormat("%B %Y"))
    const yAxis = d3
      .axisLeft()
      .scale(y)
      .ticks(5)

    const line = d3
      .line()
      .curve(d3.curveBasis)
      .x(scaleX)
      .y(scaleY)
      .defined(d => !isNaN(d.sellingPrice))

    return (
      <Chart id="shark-prices" width={pWidth} height={pHeight} margin={margin}>
        <Axis
          type="x"
          axis={xAxis}
          style={{ transform: `translateY(${height}px)` }}
          styling={this.props.styling.axis}
        />
        <Axis axis={yAxis} type="y" styling={this.props.styling.axis}>
          <Label
            dy={this.props.styling.label.fontSize}
            styling={this.props.styling.label}
            type="y"
            y={6}
          >
            Price (in gp)
          </Label>
        </Axis>

        <Line data={this.props.data} lineFunction={line} />
      </Chart>
    )
  }
}
