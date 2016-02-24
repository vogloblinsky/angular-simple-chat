function SimpleChatConfig() {
    this.showUserAvatar = true;
    this.showComposer = true;
    this.liveMode = false;
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
