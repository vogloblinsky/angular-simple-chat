/*global angular*/

define([
    'intern/chai!expect',
    'intern!bdd',
    'intern/dojo/text!SOURCES/directives/simple-chat/simple-chat.html',
    'intern/order!angular/angular',
    'intern/order!moment/moment',
    'intern/order!SOURCES/index',
    'intern/order!SOURCES/directives/simple-chat/simple-chat'
], function(expect, bdd, template) {

    //console.log(template);

    function inject(fn) {
        return function() {
            angular.injector(['ng', 'angular-simple-chat']).invoke(fn);
        }
    }

    bdd.describe('simple-chat directive', function() {

        var scope, compile, templateCache, directiveElem,

            getCompiledElement = function() {
                var compiledDirective = compile(angular.element('<simple-chat show-user-avatar="true"></simple-chat>'))(scope);
                scope.$digest();
                return compiledDirective;
            };

        bdd.beforeEach(inject(function($rootScope, $compile, $templateCache) {
            scope = $rootScope.$new();
            scope.showUserAvatar = true;
            compile = $compile;
            templateCache = $templateCache;
            directiveElem = getCompiledElement();

            $templateCache.put('directives/simple-chat/simple-chat.html', template);
        }));

        bdd.it('showUserAvatar on isolated scope should be two-way bound', function() {
            var isolatedScope = directiveElem.scope();

            isolatedScope.showUserAvatar = false;

            expect(scope.showUserAvatar).to.be.false;
        });

    });
});
