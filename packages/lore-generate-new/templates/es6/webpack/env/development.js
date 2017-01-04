/**
 * Development specific settings for webpack
 *
 * This file is where you define any webpack config overrides that should be applied in the development environment. The
 * development environment is defined as `NODE_ENV=development` or the absense of an `NODE_ENV` environment variable.
 *
 **/

const webpack = require('webpack');

// NOTE: module.exports is used instead of "export default" because Node doesn't understand
// import/export yet, and using "export default" will break publishing tasks like "gulp surge".

module.exports = function(settings) {
  const APP_ROOT = settings.APP_ROOT;
  const PORT = settings.PORT;

  return {
    entry: [
      'webpack-dev-server/client?http://localhost:' + PORT,
      'webpack/hot/dev-server',
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
