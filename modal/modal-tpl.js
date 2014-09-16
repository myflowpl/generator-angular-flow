'use strict';

angular.module('<%= scriptAppName %>')

    .run(function($modals){
        $modals.register('<%= dasherizedFullName %>', function(){
            return {
                templateUrl: '<%= templateUrl %>',
                controller: '<%= cameledFullName %>Modal'
            };
        });
    })

    .controller('<%= cameledFullName %>Modal', function ($scope, $modalInstance) {
        $scope.ok = function () {
            $modalInstance.close('reason');
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });