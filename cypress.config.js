const { defineConfig } = require("cypress");
const webpack = require('@cypress/webpack-dev-server');
const webpackConfig = require('./webpack.config'); // Path to your webpack configuration file

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    },
  },
});
