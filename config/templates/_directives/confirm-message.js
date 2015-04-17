'use strict';
/**
 * @ngdoc directive
 * @name confirmMessage
 * @restrict A
 * @description
 *
 */
angular.module('config')

    .directive('confirmMessage', function () {
        return {
            restrict: 'A',
            priority: 1,
            terminal: true,
            link: function link(scope, element, attrs) {
                element.bind('click', function(e) {
                    console.log('event', e);
                    e.stopImmediatePropagation();
                    e.preventDefault();

                    var message = attrs.confirmMessage;
                    if (message && confirm(message)) {
                        scope.$apply(attrs.ngClick);
                    }
                });
            }
        };
    });