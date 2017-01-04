const gulp         = require('gulp');
const gutil        = require('gulp-util');
const webpack      = require('webpack');
const clean        = require('gulp-clean');
const yargs        = require('yargs');
const gulpSequence = require('gulp-sequence');
const surge        = require('gulp-surge');

const argv = yargs.argv;

let config = {
  dest: './tmp',
  webpack: '../../webpack.config.js',
  domain: '', // <= todo: change this to your-custom-domain.surge.sh
  env: 'production'
};

/**
 * Run webpack, making sure to load the config and set the NODE_ENV
 */
gulp.task('surge:webpack', ['surge:config'], function(callback) {
  process.env.NODE_ENV = config.env;
  const webpackConfig = require(config.webpack);
  let myConfig = Object.create(webpackConfig);

  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify(config.env)
      }
    })
    //new webpack.optimize.DedupePlugin(),
    //new webpack.optimize.UglifyJsPlugin()
  );

  webpack(myConfig, function(err, stats) {
    if(err) {
      throw new gutil.PluginError('webpack:build', err);
    }

    gutil.log('[webpack:build]', stats.toString({ colors: true }));

    callback();
  });
});

/**
 * Build the project and copy the index.html file into the resulting directory
 */
gulp.task('surge:build', ['surge:webpack'], function() {
  return gulp.src(['./index.html'], {
    base: './'
  }).pipe(gulp.dest(config.dest));
});

/**
 * Push project to Surge
 */
gulp.task('surge:publish', function(cb) {
  return surge({
    project: config.dest,  // Path to your static build directory
    domain: config.domain  // Your domain or Surge subdomain
  }).on('close', cb);
});

/**
 * Remove any generated artifacts
 */
gulp.task('surge:clean',  function() {
  return gulp.src([
    config.dest
  ]).pipe(clean());
});

/**
 * Override configuration defaults if provided as command line arguments
 */
gulp.task('surge:config',  function() {
  config.domain = argv.domain || config.domain;
  config.webpack = argv.webpack || config.webpack;
  config.env = argv.env || config.env;
});

/**
 * Build the project and publish to the web
 */
gulp.task('surge', function(cb) {
  gulpSequence(
    'surge:clean',
    'surge:build',
    'surge:publish',
    'surge:clean',
    cb
  );
});
