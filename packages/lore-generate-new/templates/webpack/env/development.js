/**
 * Development specific settings for webpack
 *
 * This file is where you define any webpack config overrides that should be applied in the development environment. The
 * development environment is defined as `NODE_ENV=development` or the absense of an `NODE_ENV` environment variable.
 *
 **/

var webpack = require('webpack');

module.exports = function(settings) {
  var APP_ROOT = settings.APP_ROOT;
  var PORT = settings.PORT;

  return {
    entry: [
      'webpack-dev-server/client?http://localhost:' + PORT,
      'webpack/hot/only-dev-server',
      './index'
    ],
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        __LORE_ROOT__: JSON.stringify(APP_ROOT)
      })
    ]
  }
};
