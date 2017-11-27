const { config, dist } = require("./base.config")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const merge = require("webpack-merge")

module.exports = merge(config, {
  plugins: [
    new CleanWebpackPlugin([dist], {
      root: process.cwd(),
      verbose: true
    })
  ]
})
