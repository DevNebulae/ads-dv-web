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
  const updates = await import("./data/updates.json")

  let itemDaily = await fetch(API_URL, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: itemQuery("d") })
  })
    .then(response => response.json())
    .then(data => data.data.item)
    .then(convertItem)

  let itemWeekly = await fetch(API_URL, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: itemQuery("w") })
  })
    .then(response => response.json())
    .then(data => data.data.item)
    .then(convertItem)

  console.log(itemWeekly)

  drawUpdateChart(itemDaily.rsbuddy, updates, {
    element: select("#price-update-chart"),
    lineMargin: {
      y: 25
    },
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    },
    xMap: d => d.timestamp,
    yMap: d => d.sellingPrice
  })

  drawSupplyDemandChart(itemWeekly.rsbuddy, updates, {
    element: select("#supply-demand-chart"),
    lineMargin: {
      y: 0
    },
    stroke: 1.5,
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    },
    xMap: d => d.timestamp,
    yMap: d => d.sellingPriceDelta
  })
}

start()
