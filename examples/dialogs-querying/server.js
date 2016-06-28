/**
 * This is the development webpack server.  It is required if you want to
 * support the awesomeness [that is hot reloading](https://vimeo.com/100010922).
 *
 * This is the file that gets executed when you run `npm start`.  By default it
 * will make your project available on port 3000. In production, this file is
 * never executed.  Instead, the `index.html` file is served up, and the browser
 * looks for `/dist/bundle.js` (which webpack will have built when the project
 * when the project was deployed).
 **/

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var url = require('url');
var _ = require('lodash');

function getDevServerPort() {
  var devServerEntry = _.find(config.entry, function(entry) {
    return entry.indexOf('webpack-dev-server/client?') === 0;
  });
  var devServer = devServerEntry.split('?')[1];
  return url.parse(devServer).port;
}

var PORT = getDevServerPort();

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}).listen(PORT, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:' + PORT);
});
