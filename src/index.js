import "./styling"
import { drawUpdateChart } from "./charts/updates"
import { select } from "d3"

import Reveal from "reveal.js"

Reveal.initialize({
  width: "100%",
  height: "100%",
  history: true,
  center: false
})

const start = async () => {
  const item = await import("./data/items.json")
  drawUpdateChart(item.rsbuddy, select("#price-update-chart"), {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
  })

  const updates = await import("./data/updates.json")
  console.log(item)
  console.log(updates)
}

start()
