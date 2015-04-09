'use strict';

angular.module('<%= name %>')

    .directive('<%= directiveName %>', function (<%= moduleBasePathFactoryName %>) {
        return {
            restrict: 'E',
            replace:false,
            templateUrl: <%= moduleBasePathFactoryName %>('<%= templateUrl %>'),
            controller: '<%= controllerName %>'
        };
    })

    .controller('<%= controllerName %>', function ($scope) {

    });