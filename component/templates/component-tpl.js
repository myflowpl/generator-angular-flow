'use strict';

angular.module('<%= name %>')

    .directive('<%= directiveName %>', function () {
        return {
            restrict: 'E',
            replace:false,
            templateUrl: '<%= templateUrl %>',
            controller: '<%= controllerName %>'
        };
    })

    .controller('<%= controllerName %>', function ($scope) {

    });