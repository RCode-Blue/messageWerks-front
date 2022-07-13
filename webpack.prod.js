const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

const prodConfig = {
  mode: "production",
  stats: { errorDetails: true },
};

const config = (env) => {
  const environment = env.production ? ".production" : "";
  return merge(commonConfig(environment), prodConfig);
};

module.exports = config;
