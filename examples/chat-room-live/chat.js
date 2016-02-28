(function() {
    'use strict';

    angular
        .module('app', [
            'angular-simple-chat',
            'pubnub.angular.service'
        ])
        .controller('UserController', UserController);

    /* @ngInject */
    function UserController($scope, Pubnub) {
        var vm = this,
            channel = 'chat',
            onPubNubMessage = function(message, envelope, channelOrGroup, time, channel) {
                if (message.userId !== vm.you.userId) {
                    vm.messages.push(message);
                    $scope.$apply();
                }
            };

        vm.you = {
            userId: PUBNUB.uuid(),
            avatar: 'http://www.orangecountyjailministryorlando.com/wp-content/uploads/2015/01/Woman_Avatar.gif',
            username: chance.first({
                gender: 'female'
            })
        };

        vm.messages = [];

        vm.sendMessage = function(message) {
            console.log('sendMessage: ', message);
            Pubnub.publish({
                channel: channel,
                message: message
            });
        };

        vm.sendLiveMessage = function(message) {
            console.log('sendLiveMessage: ', message);
        };

        Pubnub.init({
            publish_key: 'pub-c-22238046-2bcd-4a5f-9d58-2cd156fed8b8',
            subscribe_key: 'sub-c-7be69976-dc83-11e5-9f0d-02ee2ddab7fe'
        });

        Pubnub.subscribe({
            channel: channel,
            message: onPubNubMessage
        });
    }

})();
