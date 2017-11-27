const { config, dist } = require("./base.config")
const merge = require("webpack-merge")
const path = require("path")
const webpack = require("webpack")

module.exports = merge(config, {
  devtool: "#source-map",
  devServer: {
    port: 3000
  },
  plugins: [
    // new webpack.DllReferencePlugin({
    //   manifest: require(path.resolve(dist, "vendor-manifest.json"))
    // }),
    new webpack.HotModuleReplacementPlugin()
  ]
})
