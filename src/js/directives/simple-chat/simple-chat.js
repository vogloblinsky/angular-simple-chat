(function() {
    'use strict';

    angular
        .module('angular-simple-chat.directives')
        .directive('simpleChat', simpleChat);

    /* @ngInject */
    function simpleChat() {
        var directive = {
            bindToController: true,
            controller: simpleChatController,
            controllerAs: 'sc',
            link: link,
            restrict: 'AE',
            templateUrl: 'directives/simple-chat/simple-chat.html',
            scope: {
                messages: '=',
                localUser: '=',
                toUser: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    /* @ngInject */
    function simpleChatController() {

    }
})();
