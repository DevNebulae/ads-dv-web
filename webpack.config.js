const path = require("path")
const webpack = require("webpack")

const CleanWebpackPlugin = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const src = path.join(process.cwd(), "/src")
const dist = path.join(process.cwd(), "/dist")

module.exports = {
  devtool: "#source-map",
  devServer: {
    port: 3000
  },
  entry: {
    index: [path.resolve(src, "index.js")]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.html$/,
        use: [
          "html-loader?interpolate&attrs[]=img:src&attrs[]=video:src&attrs[]=source:src"
        ]
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/"
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.mp4$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "video/"
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  output: {
    path: dist,
    filename: "[name].js"
  },
  plugins: [
    new CleanWebpackPlugin([dist], { root: process.cwd() }),
    new HtmlWebpackPlugin({
      template: path.resolve(src, "index.html")
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
