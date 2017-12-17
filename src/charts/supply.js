import * as d3 from "d3"
import _ from "lodash"

export default function(
  item,
  updates,
  noteworthyUpdates,
  { chartWidth, chartHeight, element, stroke, margin, xMap, yMap }
) {
  const drawDate = new Date("Sat Apr 01 2017 00:00:00 GMT+0200 (CEST)")

  const parent = element.node().parentNode.getBoundingClientRect()
  const chartWidthPixels = parent.width * chartWidth
  const columns = [
    "sellingPriceDelta",
    "sellingCompletedDelta",
    "buyingCompletedDelta"
  ]

  const max = 0.82
  const min = d3.min(
    _.map(
      _.map(columns, column => _.map(item, item => _.get(item, column))),
      values => d3.min(values)
    )
  )

  element.attr("width", chartWidthPixels)
  element.attr("height", chartWidthPixels * chartHeight)

  const width = element.attr("width") - margin.left - margin.right
  const height = element.attr("height") - margin.top - margin.bottom

  item = item.filter(transaction => transaction.timestamp > drawDate)
  updates = updates.filter(update => new Date(update.date) > drawDate)

  const xScale1 = d3
    .scaleBand()
    .range([0, width])
    .domain(item.map(xMap))
    .padding(0.3)
  const xScale2 = d3
    .scaleBand()
    .rangeRound([0, xScale1.bandwidth()])
    .domain(columns)
    .paddingInner(0.1)
  const xScale3 = d3
    .scaleTime()
    .range([0, width])
    .domain(d3.extent(item, xMap))
  const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([min, max])

  // const xAxis = d3.axisBottom(xScale3).tickFormat(d3.timeFormat("%Y %B"))
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(".0%"))

  const zeroY = yScale(0)
  const zeroYCorrected = yScale(0) + stroke / 2

  const svg = element
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  // svg
  //   .append("g")
  //   .attr("class", "axis x")
  //   .attr("transform", "translate(0," + height + ")")
  //   .call(xAxis)

  svg
    .append("g")
    .attr("class", "axis y")
    .call(yAxis)
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price change in %")

  svg
    .append("line")
    .attr("class", "zero-line")
    .attr("y1", zeroYCorrected)
    .attr("x2", width)
    .attr("y2", zeroYCorrected)
    .attr("stroke-width", stroke)

  const bars = svg.append("g").attr("class", "bars")

  item.forEach(data => {
    columns.forEach(column => {
      const value = data[column]
      const barWidth = xScale2.bandwidth()

      console.log(column, value)

      const barHeight = Math.abs(zeroY - yScale(value))
      const x = xScale1(xMap(data))
      const y = value < 0 ? zeroY : zeroY - barHeight
      const g = bars
        .append("g")
        .attr("transform", `translate(${xScale2(column)}, 0)`)

      g
        .append("rect")
        .attr("class", `bar ${column}`)
        .classed("negative", yMap(data) < 0)
        .attr("x", x)
        .attr("width", barWidth)
        .attr("y", y)
        .attr("height", barHeight)
    })
  })

  updates.forEach(update => {
    const x = xScale3(new Date(update.date))
    const g = svg.append("g").classed("updates", true)

    g
      .append("line")
      .attr("class", "update-line")
      .attr("x1", x)
      .attr("y1", 0)
      .attr("x2", x)
      .attr("y2", height)
  })

  noteworthyUpdates.forEach(({ start, end, index }) => {
    const x1 = xScale3(new Date(start))
    const x2 = xScale3(new Date(end))
    svg
      .append("rect")
      .attr("class", "area-of-interest pulsate updates fragment")
      .attr("data-fragment-index", index)
      .attr("x", x1)
      .attr("width", x2 - x1)
      .attr("y", 0)
      .attr("height", height)
  })
}
