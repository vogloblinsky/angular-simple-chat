'use strict';

var path = require('path'),
    gulp = require('gulp'),
    conf = require('./conf'),
    pkg = require('../package.json'),

    browserSync = require('browser-sync'),
    $ = require('gulp-load-plugins')(),

    banner = ['/*',
        ' * <%= pkg.name %> <%= pkg.version %>',
        ' * @description <%= pkg.description %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''
    ].join('\n');

gulp.task('scripts-dev', function() {
    return gulp.src([
            conf.paths.src + '/js/index.js',
            conf.paths.src + '/js/directives/**/*.js'
        ])
        .pipe($.concat(conf.mainName + '.js'))
        .pipe(gulp.dest(conf.paths.tmp + '/scripts'))
});

gulp.task('scripts-release', function() {
    return gulp.src([
            conf.paths.src + '/js/index.js',
            conf.paths.src + '/js/directives/**/*.js',
            conf.paths.tmp + '/scripts/templates.js'
        ])
        .pipe($.concat(conf.mainName + '.js'))
        .pipe($.ngAnnotate())
        .pipe($.stripDebug())
        .pipe($.iife())
        .pipe($.header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest(conf.paths.dist + '/'))
        .pipe($.uglify({
            preserveComments: 'license'
        })).on('error', conf.errorHandler('Uglify'))
        .pipe($.rename(conf.mainName + '.min.js'))
        .pipe(gulp.dest(conf.paths.dist + '/'));
});
