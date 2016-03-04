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

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}).listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
