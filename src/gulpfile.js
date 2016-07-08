var gulp = require('gulp');
var gulpPrint = require('gulp-print');
var angularFilesort = require('gulp-angular-filesort');
var useref = require('gulp-useref');
var gulpDebug = require('gulp-debug');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var inject = require('gulp-inject');

gulp.task('default', ['useref'], function () {
    gulp.src('dist/js/main.min.js')
        .pipe(angularFilesort())
        .pipe(gulpDebug())
        .pipe(gulpPrint());
});

gulp.task('useref', function () {
    return gulp.src('index.html')
        .pipe(gulpDebug())
        .pipe(useref())
        //.pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist'))
});

gulp.task('copy_bower_components', function () {
    gulp.src(['bower_components/**/*.min.js', 'bower_components/**/*.min.css'])
        .pipe(gulpDebug())
        .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('inject_bower_components', function () {
    var target = gulp.src('dist/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = gulp.src(['dist/bower_components/**/*.js', 'dist/bower_components/**/*.css'], { read: false });

    target.pipe(inject(sources, { ignorePath: 'dist' }))
        .pipe(gulp.dest('dist'));
});


gulp.task('copy_components', function () {
    gulp.src('app/**/*.html').pipe(gulp.dest('dist/app'));
});