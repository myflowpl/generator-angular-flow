'use strict';

angular.module('<%= scriptAppName %>')

    .directive('<%= cameledFullName %>Comp', function () {
        return {
            restrict: 'E',
            templateUrl: '<%= templateUrl %>',
            controller: '<%= cameledFullName %>Comp'
        };
    })

    .controller('<%= cameledFullName %>Comp', function ($scope) {

    });