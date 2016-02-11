angular
    .module('angular-simple-chat.directives')
    .directive('chatBubble', chatBubble);

/* @ngInject */
function chatBubble() {
    var directive = {
        bindToController: true,
        controller: chatBubbleController,
        controllerAs: 'cb',
        restrict: 'AE',
        templateUrl: 'directives/chat-bubble/chat-bubble.html',
        scope: {
            message: '=',
            localUser: '=',
            toUser: '='
        }
    };
    return directive;
}

/* @ngInject */
function chatBubbleController(SimpleChatConfiguration) {
    this.options = SimpleChatConfiguration.options();
}
