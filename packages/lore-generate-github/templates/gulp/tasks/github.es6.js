const gulp         = require('gulp');
const gutil        = require('gulp-util');
const webpack      = require('webpack');
const clean        = require('gulp-clean');
const yargs        = require('yargs');
const gulpSequence = require('gulp-sequence');
const githubPages  = require('gulp-gh-pages');

const argv = yargs.argv;

let config = {
  dest: './tmp',
  webpack: '../../webpack.config.js',
  branch: 'gh-pages', // <= change this to 'master' to publish to username.github.io
  env: 'production'
};

/**
 * Run webpack, making sure to load the config and set the NODE_ENV
 */
gulp.task('github:webpack', ['github:config'], function(callback) {
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
gulp.task('github:build', ['github:webpack'], function() {
  return gulp.src(['./index.html'], {
    base: './'
  }).pipe(gulp.dest(config.dest));
});

/**
 * Push project to GitHub Pages
 */
gulp.task('github:publish', function() {
  return gulp.src(config.dest + '/**/**')
    .pipe(githubPages({
      branch: config.branch
    }));
});

/**
 * Remove any generated artifacts
 */
gulp.task('github:clean',  function() {
  return gulp.src([
    config.dest
  ]).pipe(clean());
});

/**
 * Override configuration defaults if provided as command line arguments
 */
gulp.task('github:config',  function() {
  config.branch = argv.branch || config.branch;
  config.webpack = argv.webpack || config.webpack;
  config.env = argv.env || config.env;
});

/**
 * Build the project and publish to the web
 */
gulp.task('github', function(cb) {
  gulpSequence(
    'github:clean',
    'github:build',
    'github:publish',
    'github:clean',
    cb
  );
});
