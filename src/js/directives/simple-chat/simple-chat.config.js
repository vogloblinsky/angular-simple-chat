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
