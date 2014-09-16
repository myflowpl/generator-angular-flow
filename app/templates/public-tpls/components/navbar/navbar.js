'use strict';

angular.module('<%= scriptAppName %>')

    .directive('navbarComp', function () {
        return {
            restrict: 'E',
            templateUrl: '/components/navbar/navbar.html',
            controller: 'navbarComp'
        };
    })

    .controller('navbarComp', function ($scope) {

    });
