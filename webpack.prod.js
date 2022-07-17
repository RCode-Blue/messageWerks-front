const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const Dotenv = require("dotenv-webpack");

const prodConfig = (environment) => {
  return {
    mode: "production",
    stats: { errorDetails: true },
    plugins: [
      new Dotenv({
        path: `./.env${environment}`,
      }),
    ],
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};

const config = (env) => {
  const environment = env.production ? ".production" : "";
  return merge(commonConfig(environment), prodConfig(environment));
};

module.exports = config;
