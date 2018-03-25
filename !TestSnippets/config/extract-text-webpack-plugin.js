const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractTextPlugin = new ExtractTextPlugin({
  // filename: '[name].[id].[contenthash].css',
  filename: 'static/css/[name].[contenthash:8].css',
  allChunks: true,
});

/* global config */
config.plugins.push(extractTextPlugin);

// Sample from https://github.com/webpack-contrib/extract-text-webpack-plugin

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ]
}
