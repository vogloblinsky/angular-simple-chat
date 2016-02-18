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
        require: ['^simpleChat', 'messageComposer'],
        templateUrl: 'directives/message-composer/message-composer.html'
    };
    return directive;

    function link(scope, element, attrs, controllers) {
        var simpleChatCtrl = controllers[0],
            messageComposerCtrl = controllers[1];

        messageComposerCtrl.localUser = simpleChatCtrl.localUser;
        messageComposerCtrl.sendFunction = simpleChatCtrl.sendFunction;
        messageComposerCtrl.sendButtonText = simpleChatCtrl.sendButtonText;
        messageComposerCtrl.composerPlaceholderText = simpleChatCtrl.composerPlaceholderText;
    }
}

/* @ngInject */
function messageComposerController($scope) {
    this._send = function() {
        var _message = {
            id: 'sc' + Date.now(),
            text: this.rawmessage,
            userId: this.localUser.userId,
            date: Date.now()
        };
        this.sendFunction(_message);
        $scope.$emit('simple-chat-message-posted');
        this.rawmessage = '';
    };
}
