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
        require: ['^simpleChat', 'chatBubble'],
        templateUrl: 'directives/chat-bubble/chat-bubble.html',
        scope: {
            message: '='
        }
    };
    return directive;

    function link(scope, element, attrs, controllers) {
        var simpleChatCtrl = controllers[0],
            chatBubbleCtrl = controllers[1];

        chatBubbleCtrl.options = simpleChatCtrl.options;
        chatBubbleCtrl.localUser = simpleChatCtrl.localUser;
    }
}

/* @ngInject */
function chatBubbleController() {}
