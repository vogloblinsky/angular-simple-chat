(function() {
    'use strict';

    angular
        .module('angular-bootstrap-chat')
        .directive('angularBootstrapChat', angularBootstrapChat);

    angularBootstrapChat.$inject = [];

    /* @ngInject */
    function angularBootstrapChat() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: Controller,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    /* @ngInject */
    function Controller() {

    }
})();
