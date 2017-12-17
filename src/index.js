import "./styling"
import "babel-polyfill"
import _ from "lodash"
import drawUpdateChart from "./charts/updates"
import drawSupplyDemandChart from "./charts/supply"
import { itemQuery, updateQuery } from "./data/queries"
import { select } from "d3"

import Reveal from "reveal.js"

export const API_URL = "http://192.168.27.170/graphql"

Reveal.initialize({
  backgroundTransition: "slide",
  transition: "slide",
  width: "100%",
  height: "100%",
  history: true,
  center: false
})

const convertItem = item => {
  item.rsbuddy = _.map(
    item.rsbuddy,
    ({ timestamp, sellingPrice, ...rest }) => ({
      timestamp: new Date(timestamp),
      sellingPrice: parseFloat(sellingPrice),
      ...rest
    })
  )

  return item
}

async function start() {
  const chartRatio = 16 / 9
  const chartWidth = 0.97
  const chartHeight = chartWidth / chartRatio

  const updates = await import("./data/updates.json")
  let itemDaily = convertItem(
    (await import("./data/item-daily.json")).data.item
  )
  let itemWeekly = convertItem(
    (await import("./data/item-weekly.json")).data.item
  )

  const updateChartElement = select("#price-update-chart")
  const supplyDemandChartElement = select("#supply-demand-chart")

  const clear = element => {
    element.selectAll("*").remove()
  }

  const updateChart = () =>
    drawUpdateChart(itemDaily.rsbuddy, updates, {
      chartWidth,
      chartHeight,
      element: updateChartElement,
      lineMargin: {
        y: 25
      },
      margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
      },
      xMap: d => d.timestamp,
      yMap: d => d.sellingPrice
    })

  const supplyDemandChart = () =>
    drawSupplyDemandChart(itemWeekly.rsbuddy, updates, {
      chartWidth,
      chartHeight,
      element: supplyDemandChartElement,
      lineMargin: {
        y: 0.02
      },
      stroke: 1,
      margin: {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
      },
      xMap: d => d.timestamp,
      yMap: d => d.sellingCompletedDelta
    })

  updateChart()
  supplyDemandChart()

  Reveal.addEventListener("slidechanged", event => {
    switch (event.currentSlide.id) {
      case "update-price-influence":
        clear(updateChartElement)
        updateChart()
        break
      case "supply-demand-influence":
        clear(supplyDemandChartElement)
        supplyDemandChart()
        break
      default:
        break
    }
  })
}

start()
