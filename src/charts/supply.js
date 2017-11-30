import * as d3 from "d3"

export default function(
  item,
  updates,
  { element, lineMargin, stroke, margin, xMap, yMap }
) {
  const width = element.attr("width") - margin.left - margin.right
  const height = element.attr("height") - margin.top - margin.bottom

  item = item.filter(
    transaction =>
      transaction.timestamp >
      new Date("Thu Jan 01 2017 23:00:00 GMT+0000 (UTC)")
    // && transaction.sellingPriceDelta >= 0
  )

  const xScale = d3
    .scaleBand()
    .range([0, width])
    .domain(item.map(xMap))
    .padding(0.1)
  const xScale2 = d3
    .scaleTime()
    .range([0, width])
    .domain(d3.extent(item, xMap))
  const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain(d3.extent(item, yMap))

  const xAxis = d3.axisBottom(xScale2).tickFormat(d3.timeFormat("%Y %B"))
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(".0%"))

  const zeroY = yScale(0)
  const zeroYCorrected = yScale(0) + stroke / 2

  const svg = element
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  svg
    .append("g")
    .attr("class", "axis x")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)

  svg
    .append("g")
    .attr("class", "axis y")
    .call(yAxis)

  svg
    .append("line")
    .attr("class", "zero-line")
    .attr("y1", zeroYCorrected)
    .attr("x2", width)
    .attr("y2", zeroYCorrected)
    .attr("stroke-width", stroke)

  const bars = svg.append("g").attr("class", "bars")

  item.forEach(data => {
    const barWidth = xScale.bandwidth()
    const barHeight = Math.abs(zeroY - yScale(yMap(data)))
    const x = xScale(xMap(data))
    const y = Math.min(yScale(yMap(data)), zeroY)

    bars
      .append("rect")
      .attr("class", "bar price")
      .classed("negative", yMap(data) < 0)
      .attr("x", x)
      .attr("width", barWidth)
      .attr("y", y)
      .attr("height", barHeight)
  })
}
