var gulp = require('gulp');
var gulpPrint = require('gulp-print');

gulp.task('default', function() {  
  console.log('Starting my first task...');
  gulp.src('app/**/*.js')
  .pipe(gulpPrint());
});