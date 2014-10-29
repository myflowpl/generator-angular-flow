'use strict';

angular.module('<%= scriptAppName %>')

    .directive('navbarComp', function () {
        return {
            restrict: 'E',
            templateUrl: '/components/navbar/navbar.html',
            controller: 'navbarComponent'
        };
    })

    .controller('navbarComponent', function ($scope) {

    });
