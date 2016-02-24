(function() {
    'use strict';

    var Users = {
        guy: {
            userId: 'hilsqdhfods5990K226DHS01NOHoh',
            avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
            username: 'Marc'
        },
        girl: {
            userId: '4562KDJYE72930DST283DFY202Dd',
            avatar: 'http://www.orangecountyjailministryorlando.com/wp-content/uploads/2015/01/Woman_Avatar.gif',
            username: 'Anna'
        }
    };

    angular
        .module('app', [
            'angular-simple-chat'
        ])
        .constant('Users', Users)
        .controller('User1Controller', User1Controller)
        .controller('User2Controller', User2Controller)
        .service('MessagesService', MessagesService);

    /* @ngInject */
    function User1Controller(MessagesService, $scope, Users) {
        var vm = this;

        vm.guy = Users.guy;
        vm.you = Users.girl;

        vm.messages = MessagesService.getMessages();

        vm.sendMessage = MessagesService.sendMessage;

        vm.sendLiveMessage = MessagesService.sendLiveMessage;

        MessagesService.onMessage('message', Date.now(), function() {
            //console.log('User1Controller sub message');
        });

        ////////////////
    }

    /* @ngInject */
    function User2Controller(MessagesService, $scope, Users) {
        var vm = this;

        vm.guy = Users.girl;
        vm.you = Users.guy;

        vm.messages = MessagesService.getMessages();

        vm.sendMessage = MessagesService.sendMessage;

        MessagesService.onMessage('message', Date.now(), function() {
            //console.log('User2Controller sub message');
        });

        ////////////////
    }

    /* @ngInject */
    function MessagesService(ObserverService) {
        this.getMessages = getMessages;

        this.sendMessage = sendMessage;
        this.onMessage = ObserverService.attach;

        var messages = [{
            id: '535d625f898df4e80e2a125e',
            text: 'Fotzu isoko vo adget ne uba in lup jedzow mi uvinifse epepo het ezezocic bahehufep lid pubuj.',
            userId: 'hilsqdhfods5990K226DHS01NOHoh',
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
        }];

        ////////////////

        function sendMessage(message) {
            //console.log('MessagesService sendMessage: ', message);
            ObserverService.notify('message', message);
        }

        function getMessages() {
            return messages;
        }
    }

})();
