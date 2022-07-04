const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

const prodConfig = {
  mode: "production",
};

const config = (env) => {
  const environment = env.production ? ".production" : null;
  return merge(commonConfig(environment), prodConfig);
};

module.exports = config;
