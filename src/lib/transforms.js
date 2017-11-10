import _ from "lodash"
import moment from "moment"

export const itemGroupBy = (item, timeFrame) =>
  _.chain(item)
    .map(item => ({
      timestamp: moment(item.timestamp),
      buyingPrice: parseInt(item.buyingPrice, 10),
      buyingCompleted: parseInt(item.buyingCompleted, 10),
      sellingPrice: parseInt(item.sellingPrice, 10),
      sellingCompleted: parseInt(item.sellingCompleted, 10),
      overallPrice: parseInt(item.overallPrice, 10),
      overallCompleted: parseInt(item.overallCompleted, 10)
    }))
    .groupBy(item => item.timestamp.startOf(timeFrame))
    .map((item, timestamp) => ({
      timestamp: moment(timestamp),
      buyingPrice: _.meanBy(item, i => i.buyingPrice || 0),
      buyingCompleted: _.meanBy(item, i => i.buyingCompleted || 0),
      sellingPrice: _.meanBy(item, i => i.sellingPrice || 0),
      sellingCompleted: _.meanBy(item, i => i.sellingCompleted || 0),
      overallPrice: _.meanBy(item, i => i.overallPrice || 0),
      overallCompleted: _.meanBy(item, i => i.overallCompleted || 0)
    }))
    .value()
