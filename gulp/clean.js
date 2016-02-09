'use strict';

var gulp = require('gulp'),
    conf = require('./conf'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'del']
    });

gulp.task('clean', function() {
    return $.del([conf.paths.dist + '/', conf.paths.tmp + '/']);
});