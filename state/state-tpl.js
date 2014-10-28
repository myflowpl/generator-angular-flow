'use strict';

angular.module('<%= scriptAppName %>')
    .config(function ($stateProvider) {
        $stateProvider.state('<%= stateName %>', {
            url: '<%= stateUrl %>',
            views: {
                "": {
                    controller: '<%= cameledFullName %>State',
                    templateUrl: '<%= templateUrl %>'
                }
            }
        });
    })
    .controller('<%= cameledFullName %>State', function ($scope) {
        $scope.foo = 'bar';
    });
