import _ from "lodash"
import moment from "moment"

export const itemGroupBy = (item, timeFrame) =>
  _.chain(item)
    .map(item => ({
      timestamp: moment(item.timestamp),
      sellingPrice: parseFloat(item.sellingPrice, 10),
      sellingPriceDelta: parseFloat(item.sellingPriceDelta, 10)
    }))
    .groupBy(item => item.timestamp.startOf(timeFrame))
    .map((item, timestamp) => ({
      timestamp: moment(timestamp),
      sellingPrice: _.meanBy(item, i => i.sellingPrice || 0),
      sellingPriceDelta: _.meanBy(item, i => i.sellingPriceDelta || 0)
    }))
    .value()
