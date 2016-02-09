(function() {
    'use strict';

    angular
        .module('angular-simple-chat')
        .directive('angularSimpleChat', angularSimpleChat);

    angularSimpleChat.$inject = [];

    /* @ngInject */
    function angularSimpleChat() {
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
