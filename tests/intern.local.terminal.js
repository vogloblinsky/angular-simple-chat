define([
    './intern'
], function(intern) {
    intern.tunnel = 'NullTunnel';
    intern.tunnelOptions = {
        hostname: 'localhost',
        port: 4444
    };

    intern.reporters = [{
        id: 'Console'
    }, {
        id: 'LcovHtml',
        directory: 'reports'
    }];

    return intern;
});
