/**
 * This file is the default webpack config. You can override it on a per environment basis by specifying
 * environment specific files in /env.
 *
 * The intent with this file is to:
 *
 * 1. Have a build process that works out of the box so you don't have to learn Webpack until you want/need to.
 * 2. Have it include all the common loaders, so you don't have to figure out how to add things like jsx, css and images
 * into your project.
 * 3. Alias `react`, so you don't hit any issues with duplicate copies of React due to npm packages that aren't using a
 * peerDependency for React.
 * 4. Declare the application root as the **__LORE_ROOT__** variable, so that Lore knows where your project is in the
 * file system and can require all necessary files at build time.
 **/

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
        exclude: /node_modules/,
        loader: "babel-loader",
        include: APP_ROOT,
        query: {
          presets: ['react', 'es2015']
        }
      }, {
        test: /\.js$/,
        loaders: ['babel-loader'],
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
