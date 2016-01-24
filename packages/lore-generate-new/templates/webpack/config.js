var webpack = require('webpack');
var path = require('path');

module.exports = function(settings) {
  var APP_ROOT = settings.APP_ROOT;

  return {
    devtool: 'eval',
    entry: [
      './index'
    ],
    output: {
      path: path.join(APP_ROOT, "tmp/dist"),
      filename: "bundle.js",
      publicPath: "/dist/"
    },
    plugins: [
      new webpack.DefinePlugin({
        __LORE_ROOT__: JSON.stringify(APP_ROOT)
      })
    ],
    resolve: {
      extensions: ['', '.js', '.jsx'],
      alias: {
        'react': APP_ROOT + '/node_modules/react'
      }
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
        include: APP_ROOT
      }, {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }]
    }
  }
};
