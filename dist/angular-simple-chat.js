/*
 * angular-simple-chat 1.0.0
 * @description AngularJS chat directive
 * @link https://github.com/vogloblinsky/angular-simple-chat#readme
 * @license MIT
 */
;(function() {
"use strict";

chatBubbleController.$inject = ["SimpleChatConfiguration"];
messageComposerController.$inject = ["$scope"];
simpleChat.$inject = ["$timeout"];
simpleChatController.$inject = ["SimpleChatConfiguration"];angular
    .module('angular-simple-chat', [
        'angular-simple-chat.directives',
        'angularMoment'
    ]);

angular
    .module('angular-simple-chat.directives', []);

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

(function() {
    'use strict';

    angular
        .module('angular-simple-chat.directives')
        .service('SimpleChatConfiguration', SimpleChatConfiguration);

    SimpleChatConfiguration.$inject = [];

    /* @ngInject */
    function SimpleChatConfiguration() {
        var _options = {
            showUserAvatar: true
        };

        this.options = function() {
            return _options;
        };

        this.setShowUserAvatar = function(value) {
            _options.showUserAvatar = value;
        };
    }
})();

angular
    .module('angular-simple-chat.directives')
    .directive('simpleChat', simpleChat);

/* @ngInject */
function simpleChat($timeout) {
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
            showUserAvatar: '=',
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

/* @ngInject */
function simpleChatController(SimpleChatConfiguration) {
    if (angular.isDefined(this.showUserAvatar)) {
        SimpleChatConfiguration.setShowUserAvatar(this.showUserAvatar);
    }
}

angular.module("angular-simple-chat.directives").run(["$templateCache", function($templateCache) {$templateCache.put("directives/chat-bubble/chat-bubble.html","<div ng-if=\"cb.localUser.userId !== cb.message.userId\">\n    <img class=\"profile-avatar left\"\n        ng-src=\"{{cb.toUser.avatar}}\"\n        ng-if=\"cb.options.showUserAvatar\"/>\n    <div class=\"chat-bubble-container left\"\n        ng-class=\"{\'reset-margin-left\': !cb.options.showUserAvatar}\">\n        <div class=\"message-detail\">\n            <b>{{cb.toUser.username}}, </b>\n            <span am-time-ago=\"cb.message.date\"></span>\n        </div>\n        <div class=\"chat-bubble left\">\n            <div class=\"message\">{{cb.message.text}}</div>\n        </div>\n    </div>\n</div>\n<div ng-if=\"cb.localUser.userId === cb.message.userId\">\n    <img class=\"profile-avatar right\"\n        ng-src=\"{{cb.localUser.avatar}}\"\n        ng-if=\"cb.options.showUserAvatar\"/>\n    <div class=\"chat-bubble-container right\"\n        ng-class=\"{\'reset-margin-right\': !cb.options.showUserAvatar}\">\n        <div class=\"message-detail\">\n            <b>{{cb.localUser.username}}, </b>\n            <span am-time-ago=\"cb.message.date\"></span>\n        </div>\n        <div class=\"chat-bubble right\">\n            <div class=\"message\">{{cb.message.text}}</div>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("directives/message-composer/message-composer.html","<form name=\"composeForm\">\n    <textarea placeholder=\"{{mc.composerPlaceholderText || \'Write your message here.\'}}\"\n            ng-model=\"mc.rawmessage\"\n            name=\"message\"\n            ng-required=\"true\"></textarea>\n    <button ng-click=\"mc._send()\"\n        ng-disabled=\"composeForm.$invalid\">{{mc.sendButtonText || \'Send\'}}</button>\n</form>\n");
$templateCache.put("directives/simple-chat/simple-chat.html","<div class=\"simple-chat-container\">\n    <div ng-repeat=\"message in sc.messages track by message.id\" class=\"message-wrapper\">\n        <chat-bubble\n            message=\"message\"\n            local-user=\"sc.localUser\"\n            to-user=\"sc.toUser\"\n            class=\"chat-bubble-main-container\"\n        ></chat-bubble>\n    </div>\n</div>\n<message-composer\n    local-user=\"sc.localUser\"\n    send-function=\"sc.sendFunction\"\n    send-button-text=\"sc.sendButtonText\"\n    composer-placeholder-text=\"sc.composerPlaceholderText\"\n></message-composer>\n");}]);
}());
