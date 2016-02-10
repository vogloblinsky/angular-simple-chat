(function() {
    'use strict';

    angular
        .module('angular-simple-chat.directives')
        .directive('messageComposer', messageComposer);

    /* @ngInject */
    function messageComposer() {
        var directive = {
            bindToController: true,
            controller: messageComposerController,
            controllerAs: 'mc',
            link: link,
            restrict: 'AE',
            templateUrl: 'directives/message-composer/message-composer.html',
            scope: {
                sendFunction: '&',
                sendButtonText: '=',
                composerPlaceholderText: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    /* @ngInject */
    function messageComposerController() {

    }
})();
