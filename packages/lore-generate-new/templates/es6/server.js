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

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';
import url from 'url';
import _ from 'lodash';

function getDevServerPort() {
  const devServerEntry = _.find(config.entry, function(entry) {
    return entry.indexOf('webpack-dev-server/client?') === 0;
  });
  const devServer = devServerEntry.split('?')[1];
  return url.parse(devServer).port;
}

const PORT = getDevServerPort();

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
