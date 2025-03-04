const path = require("path");

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@components": path.resolve(__dirname, "src/components"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@assets": path.resolve(__dirname, "src/assets"),
  };

  return config;
};
