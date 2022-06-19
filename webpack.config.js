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
    filename: "[name].[fullhash]-[id].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devServer: {
    server: "http",
    port: 3000,
    client: {
      logging: "warn",
    },
    historyApiFallback: true,
    static: {
      publicPath: "/",
    },
  },
  devtool: "source-map",
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
      {
        use: ["source-map-loader"],
        test: /\.js$/,
        enforce: "pre",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
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
