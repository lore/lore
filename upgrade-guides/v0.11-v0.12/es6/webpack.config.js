/**
 * Webpack config for the project
 *
 * This file tells webpack how to build your project, and includes instructions for both development and production
 * environments. For an understanding of what each setting is for, see the official webpack documentation:
 *
 * https://webpack.js.org/configuration/
 *
 * If you're new to webpack, you may find this video series by Kent Dodds helpful for getting up to speed quickly:
 * https://egghead.io/courses/using-webpack-for-production-javascript-applications
 **/

var path = require('path');
var webpack = require('webpack');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var {getIfUtils, removeEmpty} = require('webpack-config-utils');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var APP_ROOT = __dirname;

module.exports = function(env) {
  var {ifProd, ifNotProd} = getIfUtils(env);

  return {
    devtool: ifProd('source-map', 'eval'),
    entry: {
      main: './index.js',
      vendor: [
        'react',
        'react-dom',
        'react-router'
      ]
    },
    output: {
      filename: ifProd(
        'bundle.[name].[chunkhash].js',
        'bundle.[name].js'
      ),
      path: path.resolve('dist'),
      pathinfo: ifNotProd(),
      publicPath: '/'
    },
    resolve: {
      alias: {
        'react': APP_ROOT + '/node_modules/react'
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: "babel-loader",
          exclude: /node_modules/
        },{
          test: /\.css/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },{
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'less-loader'
            ]
          })
        },{
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'sass-loader'
            ]
          })
        },{
          test: /\.(png|jpg|ttf|woff|woff2|eot)$/,
          use: 'url-loader?limit=8192'
        },
        {
          test: /\.svg$/,
          use: 'svg-loader'
        },{
          test: /\.json/,
          use: 'json-loader'
        }]
    },
    plugins: removeEmpty([
      new webpack.DefinePlugin({
        __LORE_ROOT__: JSON.stringify(APP_ROOT)
      }),
      new ProgressBarPlugin(),
      new ExtractTextPlugin(ifProd(
        'styles.[name].[chunkhash].css',
        'styles.[name].css'
      )),
      ifProd(new ManifestPlugin({
        fileName: 'asset-manifest.json'
      })),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor'],
      }),
      ifProd(new CopyWebpackPlugin([{
        from: 'assets/images',
        to: 'assets/images'
      }])),
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'body',
      })
    ])
  };
};
