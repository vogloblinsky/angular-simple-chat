'use strict';

var gulp = require('gulp'),
    conf = require('./conf'),
    $ = require('gulp-load-plugins')();

gulp.task('templates', function() {
    return gulp.src('./src/js/**/*.html')
        .pipe($.angularTemplatecache({
            module: 'angular-simple-chat.directives'
        }))
        .pipe(gulp.dest(conf.paths.tmp + '/scripts'));
});
