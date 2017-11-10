import { graphql } from "react-apollo"
import { itemGroupBy } from "./../lib/transforms"
import Item from "./queries/item"
import Context from "./text/Context"
import Disclaimer from "./text/Disclaimer"
import GraphQLError from "./text/GraphQLError"
import GraphQLLoading from "./text/GraphQLLoading"
import Introduction from "./text/Introduction"
import PriceChart from "./PriceChart"
import SupplyDemandChart from "./SupplyDemandChart"
import React, { Component } from "react"

class App extends Component {
  render() {
    if (this.props.data.loading) return <GraphQLLoading />
    else if (this.props.data.error) return <GraphQLError />
    else {
      const data = itemGroupBy(this.props.data.item.rsbuddy, "isoWeek")
      return (
        <div>
          <h1>Runescape item pricing</h1>
          <Introduction />
          <Context />
          <PriceChart
            data={data}
            xMap={d => d.timestamp}
            yMap={d => d.sellingPrice}
          />
          <SupplyDemandChart
            data={data}
            xMap={d => d.timestamp}
            yMap={d => d.delta}
          />
          <Disclaimer data={data} />
        </div>
      )
    }
  }
}

export default graphql(Item, { options: { variables: { id: 383 } } })(App)
