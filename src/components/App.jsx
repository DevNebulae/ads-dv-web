import { graphql } from "react-apollo"
import { itemGroupBy } from "./../lib/transforms"
import Context from "./text/Context"
import Disclaimer from "./text/Disclaimer"
import GraphQLError from "./text/GraphQLError"
import GraphQLLoading from "./text/GraphQLLoading"
import Hypotheses from "./text/Hypotheses"
import Introduction from "./text/Introduction"
import Item from "./queries/item"
import PriceChart from "./PriceChart"
import SupplyDemandChart from "./SupplyDemandChart"
import React, { Component } from "react"

class App extends Component {
  render() {
    const styling = {
      axis: {
        fontSize: "0.8em"
      },
      label: {
        fontSize: "1.2em"
      }
    }

    const height = 720
    const width = 1680
    const size = [1680, 720]
    if (this.props.data.loading) return <GraphQLLoading />
    else if (this.props.data.error) return <GraphQLError />
    else {
      const data = itemGroupBy(this.props.data.item.rsbuddy, "isoWeek")
      return (
        <div>
          <h1>Runescape item pricing</h1>
          <Introduction />
          <Context />
          <Hypotheses />
          <PriceChart
            data={data}
            size={size}
            styling={styling}
            xMap={d => d.timestamp}
            yMap={d => d.sellingPrice}
          />
          <SupplyDemandChart
            data={data}
            size={size}
            styling={styling}
            xMap={d => d.timestamp}
            yMap={d => d.sellingPriceDelta}
          />
          <Disclaimer />
        </div>
      )
    }
  }
}

export default graphql(Item, { options: { variables: { id: 383 } } })(App)
