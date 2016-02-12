angular
    .module('angular-simple-chat.directives')
    .directive('simpleChat', simpleChat);

/* @ngInject */
function simpleChat($timeout) {
    var directive = {
        bindToController: true,
        controller: 'simpleChatController',
        controllerAs: 'sc',
        link: link,
        restrict: 'AE',
        templateUrl: 'directives/simple-chat/simple-chat.html',
        scope: {
            messages: '=',
            localUser: '=',
            toUser: '=',
            sendFunction: '=',
            showUserAvatar: '=',
            showComposer: '=',
            sendButtonText: '@',
            composerPlaceholderText: '@'
        }
    };
    return directive;

    function link(scope, element, attrs) {
        var $simpleChatContainer = angular.element(element.children()[0])[0];
        scope.$on('simple-chat-message-posted', function() {
            $timeout(function() {
                $simpleChatContainer.scrollTop = $simpleChatContainer.scrollHeight;
            }, 0);
        });
    }
}

angular
    .module('angular-simple-chat.directives')
    .controller('simpleChatController', simpleChatController);

/* @ngInject */
function simpleChatController(SimpleChatConfiguration) {
    this.options = SimpleChatConfiguration.options();
    if (angular.isDefined(this.showUserAvatar)) {
        SimpleChatConfiguration.setShowUserAvatar(this.showUserAvatar);
    }
    if (angular.isDefined(this.showComposer)) {
        SimpleChatConfiguration.setShowComposer(this.showComposer);
    }
}
