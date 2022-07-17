const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const Dotenv = require("dotenv-webpack");

const buildConfig = {
  mode: "production",
  stats: { logging: "verbose" },
  plugins: [new Dotenv()],
};

const config = (env) => {
  return merge(commonConfig(), buildConfig);
};

module.exports = config;
