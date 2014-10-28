'use strict';

angular.module('<%= scriptAppName %>')

    .directive('<%= cameledFullName %>', function () {
        return {
            restrict: 'E',
            replace:true,
            templateUrl: '<%= templateUrl %>',
            controller: '<%= cameledFullName %>Component'
        };
    })

    .controller('<%= cameledFullName %>Component', function ($scope) {

    });