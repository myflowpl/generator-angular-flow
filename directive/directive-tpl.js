'use strict';
/**
 * @ngdoc directive
 * @name <%= cameledFullName %>
 * @restrict A
 * @description
 *
 */
angular.module('<%= scriptAppName %>')

    .directive('<%= cameledFullName %>', function () {
        return {
            restrict: 'A',
            link: function link(scope, element, attrs) {

            }
        };
    });