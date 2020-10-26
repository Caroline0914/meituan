const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "main")
  },
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      loaders: ["babel-loader", "ts-loader"]
    },{
      test: /\.(js|jsx)$/,
      use: [{
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react", "@babel/preset-env"]
        }
      }]
    },{
      test: /.(sass|scss)$/,
      use: ["style-loader", "css-loader", "sass-loader"]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html"
    })
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".sass"]
  },
  devServer: {
    port: "3000",
    open: true,
    hot: true,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
}