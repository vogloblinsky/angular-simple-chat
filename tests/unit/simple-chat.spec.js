/*global angular*/

define([
    'intern/chai!expect',
    'intern!bdd',
    'intern/dojo/text!SOURCES/directives/simple-chat/simple-chat.html',
    'intern/order!angular/angular',
    'intern/order!angular-mocks/angular-mocks',
    'intern/order!moment/moment',
    'intern/order!SOURCES/index',
    'intern/order!SOURCES/directives/simple-chat/simple-chat',
    'intern/order!SOURCES/directives/simple-chat/simple-chat.config'
], function(expect, bdd, template) {

    var scope, compile, element, templateCache, httpBackend, directiveElem, ctrl,

        getCompiledElement = function() {
            element = angular.element('<simple-chat messages="[]"></simple-chat>');
            var compiledDirective = compile(element)(scope);
            scope.$digest();
            return compiledDirective;
        };

    function inject(fn) {
        return function() {
            angular.injector(['ng', 'angular-simple-chat', 'ngMock']).invoke(fn);
        }
    }

    bdd.describe('simple-chat directive - init tests', function() {
        bdd.before(inject(function($rootScope, $compile, $templateCache, $httpBackend, $controller) {
            scope = $rootScope.$new();
            compile = $compile;
            templateCache = $templateCache;
            httpBackend = $httpBackend;

            templateCache.put('directives/simple-chat/simple-chat.html', template);
            //httpBackend.whenGET(/directives.*/).respond(200, template);

            directiveElem = getCompiledElement();

            ctrl = $controller('simpleChatController', {$scope: scope}, {showUserAvatar: false, showComposer: false, sendButtonText: 'envoyer', messages:[{id: 'sdfhoc2838sfd'}]});
        }));
    });

    bdd.describe('simple-chat directive - template', function() {
        bdd.it('should applied template', function() {
            expect(directiveElem.html()).to.not.equal('');
        });
        bdd.it('template should contain message-composer directive', function() {
            expect(directiveElem.find('message-composer').length).to.equal(1);
        });
    });

    bdd.describe('simple-chat directive - controller', function() {
        bdd.it('controller should exist', function() {
            expect(element.controller).to.be.a('function');
        });

        bdd.it('controller should configure showUserAvatar', function() {
            expect(ctrl.options.showUserAvatar).to.be.false;
        });

        bdd.it('controller should configure showComposer', function() {
            expect(ctrl.options.showComposer).to.be.false;
        });

        bdd.it('messages on isolated scope should be defined and with one element', function() {
            expect(ctrl.messages.length).to.equal(1);
        });

        bdd.it('sendButtonText on isolated scope should be defined', function() {
            expect(ctrl.sendButtonText).to.equal('envoyer');
        });
    });

});
