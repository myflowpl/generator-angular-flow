'use strict';

angular.module('<%= name %>')
    .config(function ($stateProvider) {
        $stateProvider.state('<%= stateName %>', {
            url: '<%= stateUrl %>',
            views: {
                "": {
                    controller: '<%= controllerName %>',
                    templateUrl: '<%= templateUrl %>'
                }
            }
        });
    })
    .controller('<%= controllerName %>', function ($scope) {

    });
