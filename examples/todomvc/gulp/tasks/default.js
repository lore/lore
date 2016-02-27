var gulp = require('gulp');

gulp.task('default:hello', function () {
  console.log("Hi! I'm the default gulp task. You can override me with something more useful.")
});

gulp.task('default', ['default:hello']);
