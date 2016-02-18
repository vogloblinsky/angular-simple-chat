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
