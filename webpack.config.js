var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'client'),
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: './client'
  }
};
