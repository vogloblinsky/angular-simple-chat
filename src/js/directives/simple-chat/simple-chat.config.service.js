angular
    .module('angular-simple-chat.directives')
    .service('SimpleChatConfiguration', SimpleChatConfiguration);

/* @ngInject */
function SimpleChatConfiguration() {
    var _options;
    this.getOptions = function(value) {
        return _options;
    };
    this.setOptions = function(value) {
        _options = value;
    };
}

function SimpleChatConfig() {
    this.showUserAvatar = true;
    this.showComposer = true;
}

SimpleChatConfig.prototype.setShowUserAvatar = function(value) {
    this.showUserAvatar = value;
};

SimpleChatConfig.prototype.setShowComposer = function(value) {
    this.showComposer = value;
};
