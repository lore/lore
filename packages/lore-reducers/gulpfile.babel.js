const gulp = require('gulp');
const babel = require('gulp-babel');
const path = require('path');

const paths = {
	src_es6: ['./src/**/*.js'],
	src_es5: './.tmp/src',
	test_es6: ['./test/**/*.js'],
	test_es5: './.tmp/test'
};

gulp.task('src_babel', () => {
	return gulp.src(paths.src_es6)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(paths.src_es5));
});

gulp.task('test_babel', () => {
	return gulp.src(paths.test_es6)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(paths.test_es5));
});

gulp.task('watch', () => {
	gulp.watch(paths.src_es6, ['src_babel']);
	gulp.watch(paths.test_es6, ['test_babel']);
});

gulp.task('default', ['src_babel', 'test_babel', 'watch']);
