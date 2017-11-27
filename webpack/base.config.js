const path = require("path")
const webpack = require("webpack")

// Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin")

// Folders
const src = path.join(process.cwd(), "/src")
const dist = path.join(process.cwd(), "/dist")

module.exports = {
  config: {
    entry: {
      // vendor: ["d3", "reveal.js"],
      index: [path.resolve(src, "index.js")]
    },
    output: {
      path: dist,
      filename: "[name].js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env"] }
          }
        },
        {
          test: /\.html$/,
          use: ["html-loader"]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: "head",
        template: path.resolve(src, "index.html")
      }),
      new webpack.DllPlugin({
        name: "[name]-manifest.json",
        path: path.resolve(dist, "[name]-manifest.json")
      }),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  },
  dist,
  src
}
