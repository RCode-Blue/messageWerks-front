const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const Dotenv = require("dotenv-webpack");

var devConfig = (environment) => {
  return {
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
};

const config = (env) => {
  console.log("---------------------------------");
  console.log("- processing 'webpack.dev.js' -");
  console.log("env: ", env);
  console.log("---------------------------------");
  const environment = env.development ? ".development" : "";
  return merge(commonConfig(environment), devConfig(environment));
};

module.exports = config;
