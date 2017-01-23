(function() {
    'use strict';

    angular
        .module('app', [
            'angular-simple-chat'
        ])

    .controller('AppController', AppController)
        .service('MockMessagesService', MockMessagesService);

    /* @ngInject */
    function AppController(MockMessagesService, $scope) {
        var vm = this;

        vm.you = {
            userId: '4562KDJYE72930DST283DFY202Dd',
            avatar: 'http://www.freelanceweb16.fr/wp-content/uploads/2015/08/Woman_Avatar.gif',
            userName: 'Anna'
        };

        vm.messages = MockMessagesService.getMessages();

        vm.sendMessage = function(message) {
            console.log('sendMessage');
        };

        $scope.$on('simple-chat-message-posted', function() {
            console.log('onMessagePosted');
        });

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
                userName: 'Jean',
                avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
                date: '1455110273886'
            }, {
                id: '535f13ffee3b2a68112b9fc0',
                text: 'Hu girucajam ifuolocag za nifjem ninze dak kadi wi zowolhim asa vouczu ci.',
                userId: '4562KDJYE72930DST283DFY202Dd',
                date: '1455110273886'
            }, {
                id: '546a5843fd4c5d581efa263a',
                text: 'Vad vo ujcofwag pelobhuz wonogmo cikutew imoissuv no doso jum govhi peva aj ven narzir gac rofbufubo il.',
                userId: 'hilsqdhfods5990K226DHS01NOHoh',
                userName: 'Jean',
                avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
                date: '1455110173886'
            }, {
                id: '54764399ab43d1d4113abfd1',
                text: 'Meug viedeloh cuwmaheba gunhe din mif kub ec limvimil boik fuj peze za sow.',
                userId: '4562KDJYE72930DST283DFY202Dd',
                date: '1455110283886'
            }, {
                id: '547643aeab43d1d4113abfd2',
                text: 'Leeczo gokurus cif wepke nidji dabuti wi itco aduzab anru cev do surakip.',
                userId: 'hilsqdhfods5990K226DHS01NOHoh',
                userName: 'Jean',
                avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
                date: '1455110483886'
            }, {
                id: '547815dbab43d1d4113abfef',
                text: 'Piazwac cah opovi cipril sonetpa da bobren teekiril fac ma attu wone piuba de ojeseki.',
                userId: '4562KDJYE72930DST283DFY202Dd',
                date: '1455110583886'
            }, {
                id: '547815dbaqsnod67892d4113abfef',
                text: 'Dubehtak re bodeju em parobji leunvil fetpok iwipog gibzi teb navibahul girofip hikfib ge.',
                userId: '4562KDJYE72930DST283DFY202Dd',
                date: '1455112283886'
            }]
        }
    }

})();
