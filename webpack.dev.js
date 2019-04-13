const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common');

const filePath = path.join(__dirname, 'browser/dist');
module.exports = merge(common, {
  mode: 'development',
  resolve: {
    extensions: ['.js'],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: filePath,
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/': `http://localhost:${process.env.PORT || 3001}`,
    },
    port: 3000,
    writeToDisk: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});