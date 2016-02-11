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
                toUser: '=',
                sendFunction: '=',
                sendButtonText: '@',
                composerPlaceholderText: '@'
            }
        };
        return directive;

        function link(scope, element, attrs) {
            console.log(element);
            var $simpleChatContainer = angular.element(element.children()[0])[0];
            scope.$on('simple-chat-message-posted', function() {
                console.log('simpleChat onMessagePosted');
                console.log($simpleChatContainer.scrollHeight);
                //angular.element($simpleChatContainer).scrollTop($simpleChatContainer.scrollHeight);
            });
        }
    }

    /* @ngInject */
    function simpleChatController() {

    }
})();
