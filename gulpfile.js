// Generated by "gulp generator"
// http://steelydylan.github.io/gulp-generator/
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var autoPrefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
gulp.task('css',function(){
  gulp.src(['src/css/**/*.css'])
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(autoPrefixer())
    .pipe(gulp.dest('./'));
});
gulp.task('babel',function(){
  gulp.src(['src/js/**/*.js'])
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(babel())
      .pipe(browserify())
    .pipe(gulp.dest('./'));
});
gulp.task('html',function(){
  gulp.src(['src/html/**/*.html'])
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(gulp.dest('./'));
});
gulp.task('default',function(){
  gulp.watch('src/js/**/*.js',['babel']);
  gulp.watch('src/css/**/*.css',['css']);
  gulp.watch('src/html/**/*.html',['html']);
});
