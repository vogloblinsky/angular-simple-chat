define([
    './intern'
], function(intern) {
    intern.tunnel = 'NullTunnel';
    intern.tunnelOptions = {
        hostname: 'localhost',
        port: 4444
    };

    intern.suites = [
        'tests/unit/simple-chat.spec'
    ];

    return intern;
});
