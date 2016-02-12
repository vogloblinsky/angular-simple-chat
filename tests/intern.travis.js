define([
    './intern'
], function(intern) {
    intern.reporters = [{
        id: 'Lcov',
        filename: 'lcov.info'
    }];

    return intern;
});
