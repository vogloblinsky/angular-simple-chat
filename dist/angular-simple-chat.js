/*
 * angular-simple-chat 1.0.11
 * @description AngularJS chat directive
 * @link https://github.com/vogloblinsky/angular-simple-chat#readme
 * @license MIT
 */
;(function() {
"use strict";

amTimeAgo.$inject = ["$window", "moment", "amMoment", "amTimeAgoConfig", "angularMomentConfig"];
messageComposerController.$inject = ["$scope"];
simpleChat.$inject = ["$timeout"];
voKeyUp.$inject = ["$timeout"];angular
    .module('angular-simple-chat', [
        'angular-simple-chat.directives'
    ]);

angular
    .module('angular-simple-chat.directives', []);

angular
    .module('angular-simple-chat.directives')
    /**
     * @ngdoc object
     * @name angularMoment.object:moment
     *
     * @description
     * moment global (as provided by the moment.js library)
     */
    .constant('moment', moment)
    /**
     * @ngdoc object
     * @name angularMoment.config:angularMomentConfig
     *
     * @description
     * Common configuration of the angularMoment module
     */
    .constant('angularMomentConfig', {
        /**
         * @ngdoc property
         * @name angularMoment.config.angularMomentConfig#preprocess
         * @propertyOf angularMoment.config:angularMomentConfig
         * @returns {string} The default preprocessor to apply
         *
         * @description
         * Defines a default preprocessor to apply (e.g. 'unix', 'etc', ...). The default value is null,
         * i.e. no preprocessor will be applied.
         */
        preprocess: null, // e.g. 'unix', 'utc', ...

        /**
         * @ngdoc property
         * @name angularMoment.config.angularMomentConfig#timezone
         * @propertyOf angularMoment.config:angularMomentConfig
         * @returns {string} The default timezone
         *
         * @description
         * The default timezone (e.g. 'Europe/London'). Empty string by default (does not apply
         * any timezone shift).
         */
        timezone: '',

        /**
         * @ngdoc property
         * @name angularMoment.config.angularMomentConfig#format
         * @propertyOf angularMoment.config:angularMomentConfig
         * @returns {string} The pre-conversion format of the date
         *
         * @description
         * Specify the format of the input date. Essentially it's a
         * default and saves you from specifying a format in every
         * element. Overridden by element attr. Null by default.
         */
        format: null,

        /**
         * @ngdoc property
         * @name angularMoment.config.angularMomentConfig#statefulFilters
         * @propertyOf angularMoment.config:angularMomentConfig
         * @returns {boolean} Whether angular-moment filters should be stateless (or not)
         *
         * @description
         * Specifies whether the filters included with angular-moment are stateful.
         * Stateful filters will automatically re-evaluate whenever you change the timezone
         * or language settings, but may negatively impact performance. true by default.
         */
        statefulFilters: true
    })

/**
 * @ngdoc object
 * @name angularMoment.config:amTimeAgoConfig
 * @module angularMoment
 *
 * @description
 * configuration specific to the amTimeAgo directive
 */
.constant('amTimeAgoConfig', {
        /**
         * @ngdoc property
         * @name angularMoment.config.amTimeAgoConfig#withoutSuffix
         * @propertyOf angularMoment.config:amTimeAgoConfig
         * @returns {boolean} Whether to include a suffix in am-time-ago directive
         *
         * @description
         * Defaults to false.
         */
        withoutSuffix: false,

        /**
         * @ngdoc property
         * @name angularMoment.config.amTimeAgoConfig#serverTime
         * @propertyOf angularMoment.config:amTimeAgoConfig
         * @returns {number} Server time in milliseconds since the epoch
         *
         * @description
         * If set, time ago will be calculated relative to the given value.
         * If null, local time will be used. Defaults to null.
         */
        serverTime: null,

        /**
         * @ngdoc property
         * @name angularMoment.config.amTimeAgoConfig#titleFormat
         * @propertyOf angularMoment.config:amTimeAgoConfig
         * @returns {string} The format of the date to be displayed in the title of the element. If null,
         *        the directive set the title of the element.
         *
         * @description
         * The format of the date used for the title of the element. null by default.
         */
        titleFormat: null,

        /**
         * @ngdoc property
         * @name angularMoment.config.amTimeAgoConfig#fullDateThreshold
         * @propertyOf angularMoment.config:amTimeAgoConfig
         * @returns {number} The minimum number of days for showing a full date instead of relative time
         *
         * @description
         * The threshold for displaying a full date. The default is null, which means the date will always
         * be relative, and full date will never be displayed.
         */
        fullDateThreshold: null,

        /**
         * @ngdoc property
         * @name angularMoment.config.amTimeAgoConfig#fullDateFormat
         * @propertyOf angularMoment.config:amTimeAgoConfig
         * @returns {string} The format to use when displaying a full date.
         *
         * @description
         * Specify the format of the date when displayed as full date. null by default.
         */
        fullDateFormat: null
    })
    .service('amMoment', ['moment', '$rootScope', '$log', 'angularMomentConfig', function(moment, $rootScope, $log, angularMomentConfig) {
        /**
         * @ngdoc property
         * @name angularMoment:amMoment#preprocessors
         * @module angularMoment
         *
         * @description
         * Defines the preprocessors for the preprocessDate method. By default, the following preprocessors
         * are defined: utc, unix.
         */
        this.preprocessors = {
            utc: moment.utc,
            unix: moment.unix
        };

        /**
         * @ngdoc function
         * @name angularMoment.service.amMoment#changeLocale
         * @methodOf angularMoment.service.amMoment
         *
         * @description
         * Changes the locale for moment.js and updates all the am-time-ago directive instances
         * with the new locale. Also broadcasts an `amMoment:localeChanged` event on $rootScope.
         *
         * @param {string} locale Locale code (e.g. en, es, ru, pt-br, etc.)
         * @param {object} customization object of locale strings to override
         */
        this.changeLocale = function(locale, customization) {
            var result = moment.locale(locale, customization);
            if (angular.isDefined(locale)) {
                $rootScope.$broadcast('amMoment:localeChanged');

            }
            return result;
        };

        /**
         * @ngdoc function
         * @name angularMoment.service.amMoment#changeTimezone
         * @methodOf angularMoment.service.amMoment
         *
         * @description
         * Changes the default timezone for amCalendar, amDateFormat and amTimeAgo. Also broadcasts an
         * `amMoment:timezoneChanged` event on $rootScope.
         *
         * @param {string} timezone Timezone name (e.g. UTC)
         */
        this.changeTimezone = function(timezone) {
            angularMomentConfig.timezone = timezone;
            $rootScope.$broadcast('amMoment:timezoneChanged');
        };

        /**
         * @ngdoc function
         * @name angularMoment.service.amMoment#preprocessDate
         * @methodOf angularMoment.service.amMoment
         *
         * @description
         * Preprocess a given value and convert it into a Moment instance appropriate for use in the
         * am-time-ago directive and the filters.
         *
         * @param {*} value The value to be preprocessed
         * @param {string} preprocess The name of the preprocessor the apply (e.g. utc, unix)
         * @param {string=} format Specifies how to parse the value (see {@link http://momentjs.com/docs/#/parsing/string-format/})
         * @return {Moment} A value that can be parsed by the moment library
         */
        this.preprocessDate = function(value, preprocess, format) {
            if (angular.isUndefined(preprocess)) {
                preprocess = angularMomentConfig.preprocess;
            }
            if (this.preprocessors[preprocess]) {
                return this.preprocessors[preprocess](value, format);
            }
            if (preprocess) {
                $log.warn('angular-moment: Ignoring unsupported value for preprocess: ' + preprocess);
            }
            if (!isNaN(parseFloat(value)) && isFinite(value)) {
                // Milliseconds since the epoch
                return moment(parseInt(value, 10));
            }
            // else just returns the value as-is.
            return moment(value, format);
        };

        /**
         * @ngdoc function
         * @name angularMoment.service.amMoment#applyTimezone
         * @methodOf angularMoment.service.amMoment
         *
         * @description
         * Apply a timezone onto a given moment object. It can be a named timezone (e.g. 'America/Phoenix') or an offset from UTC (e.g. '+0300')
         * moment-timezone.js is needed when a named timezone is used, otherwise, it'll not apply any timezone shift.
         *
         * @param {Moment} aMoment a moment() instance to apply the timezone shift to
         * @param {string=} timezone The timezone to apply. If none given, will apply the timezone
         *        configured in angularMomentConfig.timezone. It can be a named timezone (e.g. 'America/Phoenix') or an offset from UTC (e.g. '+0300')
         *
         * @returns {Moment} The given moment with the timezone shift applied
         */
        this.applyTimezone = function(aMoment, timezone) {
            timezone = timezone || angularMomentConfig.timezone;
            if (!timezone) {
                return aMoment;
            }

            if (timezone.match(/^Z|[+-]\d\d:?\d\d$/i)) {
                aMoment = aMoment.utcOffset(timezone);
            } else if (aMoment.tz) {
                aMoment = aMoment.tz(timezone);
            } else {
                $log.warn('angular-moment: named timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js?');
            }

            return aMoment;
        };
    }])
    .directive('amTimeAgo', amTimeAgo);

/* @ngInject */
function amTimeAgo($window, moment, amMoment, amTimeAgoConfig, angularMomentConfig) {
    return function(scope, element, attr) {
        var activeTimeout = null;
        var currentValue;
        var currentFormat = angularMomentConfig.format;
        var withoutSuffix = amTimeAgoConfig.withoutSuffix;
        var titleFormat = amTimeAgoConfig.titleFormat;
        var fullDateThreshold = amTimeAgoConfig.fullDateThreshold;
        var fullDateFormat = amTimeAgoConfig.fullDateFormat;
        var localDate = new Date().getTime();
        var preprocess = angularMomentConfig.preprocess;
        var modelName = attr.amTimeAgo;
        var currentFrom;
        var isTimeElement = ('TIME' === element[0].nodeName.toUpperCase());

        function getNow() {
            var now;
            if (currentFrom) {
                now = currentFrom;
            } else if (amTimeAgoConfig.serverTime) {
                var localNow = new Date().getTime();
                var nowMillis = localNow - localDate + amTimeAgoConfig.serverTime;
                now = moment(nowMillis);
            } else {
                now = moment();
            }
            return now;
        }

        function cancelTimer() {
            if (activeTimeout) {
                $window.clearTimeout(activeTimeout);
                activeTimeout = null;
            }
        }

        function updateTime(momentInstance) {
            var daysAgo = getNow().diff(momentInstance, 'day');
            var showFullDate = fullDateThreshold && daysAgo >= fullDateThreshold;

            if (showFullDate) {
                element.text(momentInstance.format(fullDateFormat));
            } else {
                element.text(momentInstance.from(getNow(), withoutSuffix));
            }

            if (titleFormat && !element.attr('title')) {
                element.attr('title', momentInstance.local().format(titleFormat));
            }

            if (!showFullDate) {
                var howOld = Math.abs(getNow().diff(momentInstance, 'minute'));
                var secondsUntilUpdate = 3600;
                if (howOld < 1) {
                    secondsUntilUpdate = 1;
                } else if (howOld < 60) {
                    secondsUntilUpdate = 30;
                } else if (howOld < 180) {
                    secondsUntilUpdate = 300;
                }

                activeTimeout = $window.setTimeout(function() {
                    updateTime(momentInstance);
                }, secondsUntilUpdate * 1000);
            }
        }

        function updateDateTimeAttr(value) {
            if (isTimeElement) {
                element.attr('datetime', value);
            }
        }

        function updateMoment() {
            cancelTimer();
            if (currentValue) {
                var momentValue = amMoment.preprocessDate(currentValue, preprocess, currentFormat);
                updateTime(momentValue);
                updateDateTimeAttr(momentValue.toISOString());
            }
        }

        scope.$watch(modelName, function(value) {
            if ((typeof value === 'undefined') || (value === null) || (value === '')) {
                cancelTimer();
                if (currentValue) {
                    element.text('');
                    updateDateTimeAttr('');
                    currentValue = null;
                }
                return;
            }

            currentValue = value;
            updateMoment();
        });

        if (angular.isDefined(attr.amFrom)) {
            scope.$watch(attr.amFrom, function(value) {
                if ((typeof value === 'undefined') || (value === null) || (value === '')) {
                    currentFrom = null;
                } else {
                    currentFrom = moment(value);
                }
                updateMoment();
            });
        }

        if (angular.isDefined(attr.amWithoutSuffix)) {
            scope.$watch(attr.amWithoutSuffix, function(value) {
                if (typeof value === 'boolean') {
                    withoutSuffix = value;
                    updateMoment();
                } else {
                    withoutSuffix = amTimeAgoConfig.withoutSuffix;
                }
            });
        }

        attr.$observe('amFormat', function(format) {
            if (typeof format !== 'undefined') {
                currentFormat = format;
                updateMoment();
            }
        });

        attr.$observe('amPreprocess', function(newValue) {
            preprocess = newValue;
            updateMoment();
        });

        attr.$observe('amFullDateThreshold', function(newValue) {
            fullDateThreshold = newValue;
            updateMoment();
        });

        attr.$observe('amFullDateFormat', function(newValue) {
            fullDateFormat = newValue;
            updateMoment();
        });

        scope.$on('$destroy', function() {
            cancelTimer();
        });

        scope.$on('amMoment:localeChanged', function() {
            updateMoment();
        });
    };
}

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

function SimpleChatConfig() {
    this.showUserAvatar = true;
    this.showComposer = true;
    this.liveMode = false;
    this.showBubbleInfos = true;
}

SimpleChatConfig.prototype.setShowUserAvatar = function(value) {
    this.showUserAvatar = value;
};

SimpleChatConfig.prototype.setShowComposer = function(value) {
    this.showComposer = value;
};

SimpleChatConfig.prototype.setLiveMode = function(value) {
    this.liveMode = value;
};

SimpleChatConfig.prototype.setShowBubbleInfos = function(value) {
    this.showBubbleInfos = value;
};

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
            sendFunction: '=',
            showUserAvatar: '=',
            showComposer: '=',
            showBubbleInfos: '=',
            sendButtonText: '@',
            composerPlaceholderText: '@',
            liveMode: '=',
            liveFlagFunction: '='
        }
    };
    return directive;

    function link(scope, element, attrs, ctrl) {
        var $simpleChatContainer = angular.element(element.children()[0])[0],
            scrollToBottom = function() {
                $simpleChatContainer.scrollTop = $simpleChatContainer.scrollHeight;
            };

        scope.$on('simple-chat-message-posted', function() {
            $timeout(scrollToBottom, 0);
        });

        scope.$watchCollection(function() {
            return scope.sc.messages;
        }, function(newVal, oldVal) {
            $timeout(scrollToBottom, 0);
        });

        if (angular.isDefined(ctrl.messages) && ctrl.messages.length > 0) {
            $timeout(scrollToBottom, 0);
        }

        if (angular.isUndefined(ctrl.messages)) {
            ctrl.messages = [];
        }
    }
}

angular
    .module('angular-simple-chat.directives')
    .controller('simpleChatController', simpleChatController);

/* @ngInject */
function simpleChatController() {
    this.options = new SimpleChatConfig();

    if (angular.isDefined(this.showUserAvatar)) {
        this.options.setShowUserAvatar(this.showUserAvatar);
    }
    if (angular.isDefined(this.showComposer)) {
        this.options.setShowComposer(this.showComposer);
    }
    if (angular.isDefined(this.showBubbleInfos)) {
        this.options.setShowBubbleInfos(this.showBubbleInfos);
    }
    if (angular.isDefined(this.liveMode)) {
        this.options.setLiveMode(this.liveMode);
    }
}

angular
    .module('angular-simple-chat.directives')
    .directive('voKeyUp', voKeyUp);

/* @ngInject */
function voKeyUp($timeout) {
    var directive = {
        link: link,
        restrict: 'AE'
    };
    return directive;

    function link(scope, element, attrs) {
        element.bind('keydown', function(event) {
            var keyCode = event.which || event.keyCode;

            if (keyCode === 16 || keyCode === 17 || keyCode === 18 || keyCode === 91 || keyCode === 93) {
                return;
            }

            if (keyCode !== 13) {
                $timeout(function() {
                    scope.$apply(function() {
                        scope.$eval(attrs.onKeyUp);
                    });
                    event.preventDefault();
                }, 0);
            }
            if (keyCode === 13) {
                $timeout(function() {
                    scope.$apply(function() {
                        scope.$eval(attrs.onEnterKey);
                    });
                    event.preventDefault();
                }, 0);
            }
        });
    }
}

angular.module("angular-simple-chat.directives").run(["$templateCache", function($templateCache) {$templateCache.put("directives/chat-bubble/chat-bubble.html","<div ng-if=\"cb.localUser.userId !== cb.message.userId\">\n    <img class=\"profile-avatar left\"\n        ng-src=\"{{cb.message.avatar}}\"\n        ng-if=\"cb.options.showUserAvatar\"/>\n    <div class=\"chat-bubble-container left\"\n        ng-class=\"{\'reset-margin-left\': !cb.options.showUserAvatar}\">\n        <div class=\"message-detail\" ng-if=\"cb.options.showBubbleInfos\">\n            <b>{{cb.message.userName}}, </b>\n            <span am-time-ago=\"cb.message.date\"></span>\n        </div>\n        <div class=\"chat-bubble left\">\n            <div class=\"message\">{{cb.message.text}}</div>\n        </div>\n    </div>\n</div>\n<div ng-if=\"cb.localUser.userId === cb.message.userId\">\n    <img class=\"profile-avatar right\"\n        ng-src=\"{{cb.localUser.avatar}}\"\n        ng-if=\"cb.options.showUserAvatar\"/>\n    <div class=\"chat-bubble-container right\"\n        ng-class=\"{\'reset-margin-right\': !cb.options.showUserAvatar}\">\n        <div class=\"message-detail\" ng-if=\"cb.options.showBubbleInfos\">\n            <b>{{cb.localUser.userName}}, </b>\n            <span am-time-ago=\"cb.message.date\"></span>\n        </div>\n        <div class=\"chat-bubble right\">\n            <div class=\"message\">{{cb.message.text}}</div>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("directives/message-composer/message-composer.html","<form name=\"composeForm\">\n    <textarea ng-attr-placeholder=\"{{mc.composerPlaceholderText || \'Write your message here.\'}}\"\n            ng-model=\"mc.rawmessage\"\n            name=\"message\"\n            vo-key-up\n            on-key-up=\"mc._onKeyUp()\"\n            on-enter-key=\"mc._send()\"\n            options=\"mc.options\"\n            ng-required=\"true\"></textarea>\n    <button ng-click=\"mc._send()\"\n        ng-disabled=\"composeForm.$invalid\">{{mc.sendButtonText || \'Send\'}}</button>\n</form>\n");
$templateCache.put("directives/simple-chat/simple-chat.html","<div class=\"simple-chat-container\"\n    ng-class=\"{\'full-height\': !sc.options.showComposer}\">\n    <div ng-repeat=\"message in sc.messages track by message.id\" class=\"message-wrapper\">\n        <chat-bubble\n            message=\"message\"\n            class=\"chat-bubble-main-container\"\n        ></chat-bubble>\n    </div>\n</div>\n<message-composer\n    ng-if=\"sc.options.showComposer\"\n></message-composer>\n");}]);
}());
