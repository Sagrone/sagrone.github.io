'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('scripts', function () {
  return gulp.src('js/init.js')
    .pipe(jshint())
    .pipe(uglify())
    .pipe(concat('init.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('default', ['scripts']);
