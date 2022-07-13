const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const VENDOR_LIBS = ["react", "react-dom"];

var config = (environment) => {
  return {
    entry: {
      bundle: "./src/index.js",
      vendor: VENDOR_LIBS,
    },
    output: {
      filename: "[name].[fullhash]-[id].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
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
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  };
};

module.exports = config;
