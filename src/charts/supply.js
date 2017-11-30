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
        new Date("Thu Jan 01 2017 23:00:00 GMT+0000 (UTC)") &&
      transaction.sellingPriceDelta >= 0
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
    .domain([
      d3.min(item, yMap) - lineMargin.y,
      d3.max(item, yMap) + lineMargin.y
    ])

  const xAxis = d3.axisBottom(xScale2).tickFormat(d3.timeFormat("%Y %B"))
  const yAxis = d3.axisLeft(yScale)

  const svg = element
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)

  svg.append("g").call(yAxis)

  svg
    .append("line")
    .attr("class", "zero-line")
    .attr("x1", margin.left)
    .attr("y1", yScale(0))
    .attr("x2", width)
    .attr("y2", yScale(0))
    .attr("stroke-width", stroke)

  console.log(yScale(0))

  svg
    .selectAll(".bar")
    .data(item)
    .enter()
    .append("rect")
    .attr("class", "bar price")
    .attr("x", d => xScale(xMap(d)))
    .attr("width", xScale.bandwidth())
    .attr("y", d => height - yScale(yMap(d)))
    .attr("height", d => yScale(yMap(d)))
}
