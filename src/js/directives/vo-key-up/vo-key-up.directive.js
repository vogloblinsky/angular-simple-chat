angular
    .module('angular-simple-chat.directives')
    .directive('voKeyUp', voKeyUp);

/* @ngInject */
function voKeyUp($timeout) {
    var directive = {
        link: link,
        restrict: 'AE'
    };
    return directive;

    function link(scope, element, attrs) {
        element.bind('keydown', function(event) {
            var keyCode = event.which || event.keyCode;

            if (keyCode === 16 || keyCode === 17 || keyCode === 18 || keyCode === 91 || keyCode === 93) {
                return;
            }

            if (keyCode !== 13) {
                $timeout(function() {
                    scope.$apply(function() {
                        scope.$eval(attrs.onKeyUp);
                    });
                    event.preventDefault();
                }, 0);
            }
            if (keyCode === 13) {
                $timeout(function() {
                    scope.$apply(function() {
                        scope.$eval(attrs.onEnterKey);
                    });
                    event.preventDefault();
                }, 0);
            }
        });
    }
}
