import * as d3 from "d3"

export const drawUpdateChart = (data, svg, { top, right, bottom, left }) => {
  const width = svg.attr("width") - left - right
  const height = svg.attr("height") - top - bottom

  const x = d3
    .scaleTime()
    .range([0, width])
    .domain(d3.extent(data, d => d.timestamp))
  const y = d3
    .scaleLinear()
    .rangeRound([height, 0])
    .domain(d3.extent(data, d => d.sellingPrice))

  const group = svg.append("g").attr("transform", `translate(${left}, ${top})`)
  const line = d3
    .line()
    .x(d => d.timestamp)
    .y(d => d.sellingPrice)

  group
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove()

  group
    .append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price ($)")

  group
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line)
}
