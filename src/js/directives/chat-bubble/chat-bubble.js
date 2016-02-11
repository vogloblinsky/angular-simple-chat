(function() {
    'use strict';

    angular
        .module('angular-simple-chat.directives')
        .directive('chatBubble', chatBubble);

    /* @ngInject */
    function chatBubble() {
        var directive = {
            bindToController: true,
            controller: chatBubbleController,
            controllerAs: 'cb',
            link: link,
            restrict: 'AE',
            templateUrl: 'directives/chat-bubble/chat-bubble.html',
            scope: {
                message: '=',
                localUser: '=',
                toUser: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    /* @ngInject */
    function chatBubbleController(SimpleChatConfiguration) {
        this.options = SimpleChatConfiguration.options;
    }
})();
