'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'run-sequence']
    });

gulp.task('tests-ng', function() {
    return gulp.src('')
        .pipe($.run('intern-runner config=tests/intern.local.terminal'));
});

gulp.task('tests', function() {
    return $.runSequence(
        'tests-ng'
    );
});
