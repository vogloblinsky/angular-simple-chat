'use strict';

var gulp = require('gulp'),
    conf = require('./conf'),

    $ = require('gulp-load-plugins')(),

    injectFiles = gulp.src(conf.paths.src + '/js/**/*.scss', {
        read: false
    }),

    injectOptions = {
        transform: function(filePath) {
            filePath = filePath.replace(conf.paths.src + '/app/', '');
            return '@import "' + filePath + '";';
        },
        starttag: '// injector',
        endtag: '// endinjector',
        addRootSlash: false
    };

gulp.task('styles-dev', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe($.inject(injectFiles, injectOptions))
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
        .pipe($.inject(injectFiles, injectOptions))
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
