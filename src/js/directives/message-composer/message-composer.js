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
        messageComposerCtrl.liveFlagFunction = simpleChatCtrl.liveFlagFunction;
    }
}

/* @ngInject */
function messageComposerController($scope) {
    var that = this,
        resetLiveLastMessageReference = false,
        _sendFx = function() {
            if (!angular.isDefined(that.rawmessage)) {
                return;
            }
            var _message = {
                id: 'sc' + Date.now(),
                type: 'message',
                text: that.rawmessage,
                userId: that.localUser.userId,
                avatar: that.localUser.avatar,
                userName: that.localUser.userName,
                date: Date.now()
            };
            if (that.options.liveMode && angular.isDefined(that.liveFlagFunction) && that.rawmessage.length === 1) {
                that.liveFlagFunction({
                    id: 'sc' + Date.now(),
                    type: 'flag',
                    userId: that.localUser.userId,
                    label: 'startSentence'
                });
            }
            if (!resetLiveLastMessageReference) {
                that.sendFunction(_message);
            }
            if (that.options.liveMode && !resetLiveLastMessageReference) {
                if (that.messages.length === 0) {
                    that.messages.push(_message);
                } else {
                    if (that.rawmessage.length === 1) {
                        that.messages.push(_message);
                    } else {
                        that.messages[that.messages.length - 1] = _message;
                    }
                }
            } else if (that.options.liveMode && resetLiveLastMessageReference) {
                resetLiveLastMessageReference = false;
                that.rawmessage = '';
                that.liveFlagFunction({
                    id: 'sc' + Date.now(),
                    type: 'flag',
                    userId: that.localUser.userId,
                    label: 'endSentence'
                });
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
            resetLiveLastMessageReference = true;
        }
        _sendFx();
    };
    this._onKeyUp = function() {
        if (this.options.liveMode) {
            _sendFx();
        }
    };
}
