(function() {
    'use strict';

    angular
        .module('app', [
            'angular-bootstrap-chat'
        ])

    .controller('AppController', AppController);

    AppController.$inject = [];

    /* @ngInject */
    function AppController() {
        var vm = this;

        vm.guy = {
            _id: 'hilsqdhfods5990K226DHS01NOHoh',
            pic: 'http://ionicframework.com/img/docs/tully.jpg',
            username: 'Tully'
        }

        vm.you = {
            _id: '4562KDJYE72930DST283DFY202Dd',
            pic: 'http://ionicframework.com/img/docs/stantz.jpg',
            username: 'Ray'
        };

        vm.messages = [
            {
                id: '522839JDUszz900l',
                date: '2014-04-27T20:02:39.082Z',
                text: 'Hello dude',
                userId: 'hilsqdhfods5990K226DHS01NOHoh'
            },
            {
                id: '522839JDUszzqsqse8ENJSLsl182Lm',
                date: '2014-04-27T20:04:40.000Z',
                text: 'Hi !',
                userId: '4562KDJYE72930DST283DFY202Dd'
            }
        ];

        ////////////////

    }
})();
