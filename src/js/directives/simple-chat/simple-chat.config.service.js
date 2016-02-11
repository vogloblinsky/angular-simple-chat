(function() {
    'use strict';

    angular
        .module('angular-simple-chat.directives')
        .service('SimpleChatConfiguration', SimpleChatConfiguration);

    SimpleChatConfiguration.$inject = [];

    /* @ngInject */
    function SimpleChatConfiguration() {
        var _options = {
            showUserAvatar: false
        };

        this.options = options();

        ////////////////

        function options() {
            return _options;
        }
    }
})();
