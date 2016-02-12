angular
    .module('angular-simple-chat.directives')
    .service('SimpleChatConfiguration', SimpleChatConfiguration);

SimpleChatConfiguration.$inject = [];

/* @ngInject */
function SimpleChatConfiguration() {
    var _options = {
        showUserAvatar: true,
        showComposer: true
    };

    this.options = function() {
        return _options;
    };

    this.setShowUserAvatar = function(value) {
        _options.showUserAvatar = value;
    };

    this.setShowComposer = function(value) {
        _options.showComposer = value;
    };
}
