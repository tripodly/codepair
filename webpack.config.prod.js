var path = require('path');
var webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || "development";
console.log('process ENV : ',process.env.NODE_ENV);

module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname + '/client/build/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        },
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress:{
          warnings: true
        }
    })
  ],
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'client'),
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        include: /src/, 
        loader: "style-loader!css-loader"
      }
    ]
  }
};