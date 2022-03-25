const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

const VENDOR_LIBS = ["react", "react-dom"];

var config = {
  mode: "development",
  entry: {
    bundle: "./src/index.js",
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[fullhash]-[id].js",
  },
  devServer: {
    static: {
      publicPath: "/",
    },
    port: 3001,
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/,
      },
      {
        use: ["style-loader", "css-loader", "sass-loader"],
        test: /\.s[ac]ss$/i,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new Dotenv(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};

module.exports = config;
