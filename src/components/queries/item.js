import gql from "graphql-tag"

export default gql`
  query RuneScapeQuery($id: Int!) {
    item(id: $id) {
      name
      store
      rsbuddy {
        timestamp
        buyingPrice
        buyingCompleted
        sellingPrice
        sellingCompleted
        overallPrice
        overallCompleted
      }
    }
  }
`
