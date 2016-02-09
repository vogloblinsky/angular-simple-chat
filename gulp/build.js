'use strict';

var path = require('path'),
    gulp = require('gulp'),
    conf = require('./conf'),
    p = require('../package.json'),

    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'del', 'run-sequence']
    });

gulp.task('build', function() {
    return $.runSequence(
        'clean', 'templates', 'scripts-release', 'styles-release'
    );
});
