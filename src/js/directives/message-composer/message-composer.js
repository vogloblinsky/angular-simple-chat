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
            restrict: 'AE',
            templateUrl: 'directives/message-composer/message-composer.html',
            scope: {
                localUser: '=',
                sendFunction: '=',
                sendButtonText: '=',
                composerPlaceholderText: '='
            }
        };
        return directive;
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
})();
