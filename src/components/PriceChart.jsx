import * as d3 from "d3"
import Axis from "./charts/Axis"
import Chart from "./charts/Chart"
import Line from "./charts/Line"
import React, { Component } from "react"
import styled from "styled-components"

const AxisLabelY = styled.text`
  fill: black;
  transform: rotate(-90deg);
  dy: 0.71em;
  text-anchor: end;
`

export default class PriceChart extends Component {
  render() {
    const fullWidth = 1680
    const fullHeight = 720
    const margin = { top: 20, right: 20, bottom: 30, left: 50 }
    const width = fullWidth - margin.left - margin.right
    const height = fullHeight - margin.top - margin.bottom

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
      .x(scaleX)
      .y(scaleY)
      .defined(d => !isNaN(d.sellingPrice))

    return (
      <Chart
        id="shark-prices"
        width={fullWidth}
        height={fullHeight}
        margin={margin}
      >
        <Axis
          type="x"
          axis={xAxis}
          style={{ transform: `translateY(${height}px)` }}
        />
        <Axis type="y" axis={yAxis}>
          <AxisLabelY y={20}>Price (in gp)</AxisLabelY>
        </Axis>

        <Line data={this.props.data} lineFunction={line} />
      </Chart>
    )
  }
}
