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
        messageComposerCtrl.options = simpleChatCtrl.options;
        messageComposerCtrl.messages = simpleChatCtrl.messages;
        messageComposerCtrl.sendLiveFunction = simpleChatCtrl.sendLiveFunction;
    }
}

/* @ngInject */
function messageComposerController($scope) {
    var that = this,
        resetLiveLastMessageReference = true,
        _sendFx = function() {
            if (!angular.isDefined(that.rawmessage)) {
                return;
            }
            var _message = {
                id: 'sc' + Date.now(),
                text: that.rawmessage,
                userId: that.localUser.userId,
                date: Date.now()
            };
            that.sendFunction(_message);
            if (angular.isDefined(that.sendLiveFunction)) {
                that.sendLiveFunction(_message);
            }
            if (that.options.liveMode && !resetLiveLastMessageReference) {
                that.messages[that.messages.length - 1] = _message;
            } else if (that.options.liveMode && resetLiveLastMessageReference) {
                that.messages.push(_message);
                resetLiveLastMessageReference = false;
            } else {
                that.messages.push(_message);
            }
            $scope.$emit('simple-chat-message-posted');
            if (!that.options.liveMode) {
                that.rawmessage = '';
            }
        };
    this._send = function() {
        if (this.options.liveMode) {
            this.rawmessage = '';
            resetLiveLastMessageReference = true;
        } else {
            _sendFx();
        }
    };
    this._sendWithEnter = function() {
        if (this.options.liveMode) {
            this.rawmessage = '';
            resetLiveLastMessageReference = true;
        } else {
            _sendFx();
        }
    };
    this._onKeyUp = function() {
        if (this.options.liveMode) {
            _sendFx();
        }
    };
}
