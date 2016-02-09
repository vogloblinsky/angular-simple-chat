'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'run-sequence']
    });

gulp.task('tests-ng', function() {
    return gulp.src('')
        .pipe($.run('intern-runner config=test/intern-browser.local reporters=console reporters=lcov reporters=lcovhtml reporters=junit'));
});

gulp.task('tests', function() {
    return $.runSequence(
        'tests-js'
    );
});
