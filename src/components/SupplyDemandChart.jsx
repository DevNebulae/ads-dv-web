import * as d3 from "d3"
import Axis from "./charts/Axis"
import Chart from "./charts/Chart"
import Label from "./charts/Label"
import React, { Component } from "react"
import styled from "styled-components"

const Bar = styled.rect`
  fill: ${props => (props.negative ? "#F44336" : "#00BCD4")};
`
const BaseLine = styled.line`
  stroke-width: 2;
  stroke: black;
`

export default class SupplyDemandChart extends Component {
  render() {
    const [pWidth, pHeight] = this.props.size
    const margin = { top: 20, right: 20, bottom: 30, left: 50 }
    const width = pWidth - margin.left - margin.right
    const height = pHeight - margin.top - margin.bottom

    const x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.2)
      .domain(this.props.data.map(this.props.xMap))
    const y = d3
      .scaleLinear()
      .rangeRound([height, 0])
      .domain([
        d3.min(this.props.data, this.props.yMap),
        d3.max(this.props.data, this.props.yMap)
      ])

    const xAxis = d3
      .axisBottom()
      .scale(x)
      .tickFormat(d3.timeFormat("%B %Y"))
    const yAxis = d3
      .axisLeft()
      .scale(y)
      .tickFormat(d => `${d3.format(".2f")(d * 100)}%`)

    return (
      <Chart
        id="shark-supply-demand"
        width={pWidth}
        height={pHeight}
        margin={margin}
      >
        <Axis
          type="x"
          axis={xAxis}
          style={{ transform: `translate(0, ${height}px)` }}
          styling={this.props.styling.axis}
        />
        <BaseLine x2={width} y1={y(0)} y2={y(0)} />
        <Axis axis={yAxis} type="y" styling={this.props.styling.axis}>
          <Label
            dy={this.props.styling.label.fontSize}
            styling={this.props.styling.label}
            type="y"
            y={6}
          >
            Price change (in %)
          </Label>
        </Axis>

        {this.props.data.map((d, index) => (
          <Bar
            key={`bars-${index}`}
            negative={d.sellingPriceDelta < 0}
            className={"bar"}
            x={x(this.props.xMap(d))}
            width={x.bandwidth()}
            y={Math.min(y(this.props.yMap(d)), y(0))}
            height={Math.abs(y(0) - y(d.sellingPriceDelta))}
          >
            {/*
				The logic behind the mathematics is as follows:

				The rectangle is based on a y-position and is drawn downwards.
				If the value is positive, the y-position is lesser than the
				0-line. If the value of the bar-chart is negative, the bar needs
				to be drawn from the 0-line, meaning that you should pick the
				lesser y-value of the two. If SVG accepted negative height
				values, this would not be necessary. The height always needs to
				be positive, so calculate the difference to the 0-line.
			*/}
          </Bar>
        ))}
      </Chart>
    )
  }
}
