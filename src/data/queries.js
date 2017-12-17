export const itemQuery = resample =>
  `
    query {
      item(id: 383) {
        id
        name
        store
        rsbuddy(resample: "${resample}") {
          timestamp
          sellingPrice
          sellingPriceDelta
          sellingCompletedDelta
          buyingCompletedDelta
        }
      }
    }
  `

export const updateQuery = () => `
    query {
      updates {
        date
        content
      }
    }
`
