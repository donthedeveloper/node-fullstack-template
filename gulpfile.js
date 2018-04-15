'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src('./browser/src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./browser/public/css'));
});

gulp.task('sass:watch', ['sass'], function() {
    gulp.watch('./browser/src/sass/**/*.scss', ['sass']);
});