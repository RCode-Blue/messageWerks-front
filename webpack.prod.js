const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const Dotenv = require("dotenv-webpack");

const prodConfig = {
  mode: "production",
  stats: { errorDetails: true },
  plugins: [new Dotenv()],
};

const config = (env) => {
  const environment = env.production ? ".production" : "";
  return merge(commonConfig(environment), prodConfig);
};

module.exports = config;
