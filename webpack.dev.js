const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const Dotenv = require("dotenv-webpack");

var devConfig = {
  mode: "development",
  target: "web",
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
        use: ["source-map-loader"],
        test: /\.js$/,
        enforce: "pre",
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: `./.env${environment}`,
    }),
  ],
};

const config = (env) => {
  const environment = env.development ? ".development" : "";
  return merge(commonConfig(environment), devConfig);
};

module.exports = config;
