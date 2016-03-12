var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var shell = require('gulp-shell');
var del = require('del');
var gulpSequence = require('gulp-sequence');

/**
 * Serve the Gitbook in a new browser tab and rebuild & reload the page on changes
 */
gulp.task('docs:serve', function() {
  browserSync.init({
    server: {
      baseDir: './_book'
    },
    ui: {
      port: 8080
    }
  });

  gulp.watch(['./README.md', 'docs/**/*.md'], ['docs:rebuild']);
});

/**
 * Rebuild the docs and reload the browser
 */
gulp.task('docs:rebuild', function(cb) {
  gulpSequence(
    'docs:build',
    'reload',
    cb
  );
});

/**
 * Reload the browser to show changes
 */
gulp.task('reload', function(cb) {
  browserSync.reload();
  cb();
});

/**
 * Install any neccesary Gitbook plugins
 */
gulp.task('docs:install', shell.task([
  'gitbook install'
]));

/**
 * Use the gitbook-cli to build the docs and place in _book
 */
gulp.task('docs:build', shell.task([
  'gitbook build'
]));

/**
 * Delete the _book folder
 */
gulp.task('docs:clean', function () {
  return del([
    '_book'
  ]);
});

/**
 * Build the docs and open in a new browser tab
 */
gulp.task('docs', function(cb) {
  gulpSequence(
    'docs:clean',
    'docs:install',
    'docs:build',
    'docs:serve',
    cb
  );
});
