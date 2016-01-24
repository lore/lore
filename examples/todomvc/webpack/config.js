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
        'react/lib': APP_ROOT + '/node_modules/react/lib',
        'react/addons': APP_ROOT + '/node_modules/react/addons',
        'react': APP_ROOT + '/node_modules/react',
        'globals': APP_ROOT + '/config/globals.js'
      }
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
        include: APP_ROOT
      }, {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot', 'babel'],
        include: /node_modules\/material-ui\/src/
      }, {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(APP_ROOT, '..', '..', 'src')
      }, {
        test: /\.css/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }, {
        test: /\.json/,
        loader: 'json-loader'
      }]
    }
  }
};
