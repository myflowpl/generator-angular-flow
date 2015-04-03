'use strict';

angular.module('<%= name %>')
    .config(function ($stateProvider, <%= moduleBasePathFactoryName %>) {
        $stateProvider.state('<%= stateName %>', {
            url: '<%= stateUrl %>',
            views: {
                "": {
                    controller: '<%= controllerName %>',
                    templateUrl: <%= moduleBasePathFactoryName %>('<%= templateUrl %>')
                }
            }
        });
    })
    .controller('<%= controllerName %>', function ($scope) {

    });
