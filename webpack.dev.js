const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

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
};

// comment
const config = (env) => {
  const environment = env.development ? ".development" : "";
  return merge(commonConfig(environment), devConfig);
};

module.exports = config;
