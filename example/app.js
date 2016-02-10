(function() {
    'use strict';

    angular
        .module('app', [
            'angular-simple-chat'
        ])

    .controller('AppController', AppController)
        .service('MockMessagesService', MockMessagesService);

    /* @ngInject */
    function AppController(MockMessagesService) {
        var vm = this;

        vm.guy = {
            userId: 'hilsqdhfods5990K226DHS01NOHoh',
            avatar: 'http://ionicframework.com/img/docs/tully.jpg',
            username: 'Tully'
        }

        vm.you = {
            userId: '4562KDJYE72930DST283DFY202Dd',
            avatar: 'http://ionicframework.com/img/docs/stantz.jpg',
            username: 'Ray'
        };

        vm.messages = MockMessagesService.getMessages();

        ////////////////
    }

    /* @ngInject */
    function MockMessagesService() {
        this.getMessages = getMessages;

        ////////////////

        function getMessages() {
            return [{
                id: '535d625f898df4e80e2a125e',
                text: 'Fotzu isoko vo adget ne uba in lup jedzow mi uvinifse epepo het ezezocic bahehufep lid pubuj.',
                userId: 'hilsqdhfods5990K226DHS01NOHoh',
                date: '2016-01-27T20:02:39.082Z'
            }, {
                id: '535f13ffee3b2a68112b9fc0',
                text: 'Hu girucajam ifuolocag za nifjem ninze dak kadi wi zowolhim asa vouczu ci.',
                userId: '4562KDJYE72930DST283DFY202Dd',
                date: '2016-01-27T20:02:59.082Z'
            }, {
                id: '546a5843fd4c5d581efa263a',
                text: 'Vad vo ujcofwag pelobhuz wonogmo cikutew imoissuv no doso jum govhi peva aj ven narzir gac rofbufubo il.',
                userId: 'hilsqdhfods5990K226DHS01NOHoh',
                date: '2016-01-27T20:03:22.022Z'
            }, {
                id: '54764399ab43d1d4113abfd1',
                text: 'Meug viedeloh cuwmaheba gunhe din mif kub ec limvimil boik fuj peze za sow.',
                userId: '4562KDJYE72930DST283DFY202Dd',
                date: '2016-01-27T20:03:30.082Z'
            }, {
                id: '547643aeab43d1d4113abfd2',
                text: 'Leeczo gokurus cif wepke nidji dabuti wi itco aduzab anru cev do surakip.',
                userId: 'hilsqdhfods5990K226DHS01NOHoh',
                date: '2016-01-27T20:03:49.082Z'
            }, {
                id: '547815dbab43d1d4113abfef',
                text: 'Piazwac cah opovi cipril sonetpa da bobren teekiril fac ma attu wone piuba de ojeseki.',
                userId: '4562KDJYE72930DST283DFY202Dd',
                date: '2016-01-27T20:03:58.082Z'
            }, {
                id: '547815dbaqsnod67892d4113abfef',
                text: 'Dubehtak re bodeju em parobji leunvil fetpok iwipog gibzi teb navibahul girofip hikfib ge.',
                userId: '4562KDJYE72930DST283DFY202Dd',
                date: '2016-01-27T20:04:09.082Z'
            }]
        }
    }

})();
