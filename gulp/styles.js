'use strict';

var gulp = require('gulp'),
    conf = require('./conf'),

    $ = require('gulp-load-plugins')();

gulp.task('styles-dev', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe($.sass({
            outputStyle: 'expanded'
        }).on('error', conf.errorHandler('Sass')))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(conf.paths.tmp + '/styles/'));
});

gulp.task('styles-release', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe($.sass({
            outputStyle: 'expanded'
        }).on('error', conf.errorHandler('Sass')))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe($.rename(conf.mainName + '.css'))
        .pipe(gulp.dest(conf.paths.dist + '/'))
        .pipe($.cssnano())
        .pipe($.rename(conf.mainName + '.min.css'))
        .pipe(gulp.dest(conf.paths.dist + '/'));
});
