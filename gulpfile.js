var gulp = require('gulp');
var browserify = require('browserify');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var reactify = require('reactify');

gulp.task('browserify', function() {
  var bundler = browserify('./src/js/main.js', {debug: true});
  bundler.transform(reactify);
  bundler.bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('copy', function() {
  gulp.src('src/index.html')
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['browserify', 'copy']);

gulp.task('watch', function() {
  gulp.watch('src/**/*.*', ['default']);
});