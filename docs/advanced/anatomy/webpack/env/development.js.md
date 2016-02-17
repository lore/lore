# app/config/env/development.js

### Purpose

This file is where you define any webpack config overrides that should be applied in the development environment. The
development environment is defined as `NODE_ENV=development` or the absense of an `NODE_ENV` environment variable.

```js
/**
 * Development specific settings for webpack
 */

var webpack = require('webpack');

module.exports = function(settings) {
  var APP_ROOT = settings.APP_ROOT;

  return {
    entry: [
      'webpack-dev-server/client?http://localhost:3000',
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
```
