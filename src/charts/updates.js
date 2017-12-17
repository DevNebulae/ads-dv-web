import * as d3 from "d3"
import { legendColor } from "d3-svg-legend"

export default function drawSupplyDemandChart(
  item,
  updates,
  noteworthyUpdates,
  { chartWidth, chartHeight, element, lineMargin, margin, xMap, yMap }
) {
  const drawDate = new Date("Sat Apr 01 2017 00:00:00 GMT+0200 (CEST)")

  item = item.filter(transaction => transaction.timestamp > drawDate)
  updates = updates.filter(update => new Date(update.date) > drawDate)

  const parent = element.node().parentNode.getBoundingClientRect()
  const chartWidthPixels = parent.width * chartWidth

  element.attr("width", chartWidthPixels)
  element.attr("height", chartWidthPixels * chartHeight)

  const width = element.attr("width") - margin.left - margin.right
  const height = element.attr("height") - margin.top - margin.bottom

  const svg = element
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  const xScale = d3
    .scaleTime()
    .range([0, width])
    .domain(d3.extent(item, xMap))
  const yScale = d3
    .scaleLinear()
    .rangeRound([height, 0])
    .domain([
      d3.min(item, yMap) - lineMargin.y,
      d3.max(item, yMap) + lineMargin.y
    ])

  const xAxis = d3
    .axisBottom(xScale)
    .scale(xScale)
    .tickFormat(d3.timeFormat("%Y %B"))
  const yAxis = d3.axisLeft(yScale).tickSizeOuter(0)

  const line = d3
    .line()
    .x(d => xScale(xMap(d)))
    .y(d => yScale(yMap(d)))

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
    .text("Price in gp")

  svg
    .append("g")
    .attr("class", "axis x")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis)

  svg
    .append("path")
    .datum(item)
    .attr("data-legend", "Price")
    .attr("class", "graph-line")
    .attr("fill", "none")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line)

  const updateGroup = svg.append("g").attr("class", "updates")

  updates.forEach(update => {
    const x = xScale(new Date(update.date))
    updateGroup
      .append("line")
      .attr("class", "update-line")
      .attr("x1", x)
      .attr("y1", height)
      .attr("x2", x)
      .attr("y2", 0 + margin.top)
  })

  noteworthyUpdates.forEach(({ start, end, index }) => {
    const x1 = xScale(new Date(start))
    const x2 = xScale(new Date(end))
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
