'use strict';

angular.module('<%= name %>')

    .run(function($modals){
        $modals.register('<%= modalName %>', function(){
            return {
                templateUrl: '<%= templateUrl %>',
                controller: '<%= controllerName %>'
            };
        });
    })

    .controller('<%= controllerName %>', function ($scope, $modalInstance) {
        $scope.ok = function () {
            $modalInstance.close('reason');
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });