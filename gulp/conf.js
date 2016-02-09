var gutil = require('gulp-util');

exports.paths = {
    src: 'src',
    dist: 'dist',
    tmp: '.tmp'
};

exports.mainName = 'angular-simple-chat';

exports.wiredep = {
    directory: 'bower_components'
};

exports.errorHandler = function(title) {
    'use strict';

    return function(err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};
