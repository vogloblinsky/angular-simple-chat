'use strict';

var gulp = require('gulp');

gulp.task('watch', ['styles-dev', 'scripts-dev', 'templates'], function() {
    gulp.watch(['./examples/**/*.html'], ['serve-reload']);
    gulp.watch(['./src/**/*.js', './example/**/*.js'], ['serve-reload']);
    gulp.watch(['./src/**/*.html'], ['templates-reload']);
    gulp.watch(['./src/**/*.scss'], ['sass-reload']);
});
