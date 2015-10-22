'use strict';

require('./<%= file.name %>.scss');

angular.module('<%= module.name %>')

    .config(function($modalsProvider){
        $modalsProvider.register('<%= modalName %>', function(params, config){
            return {
                template: require('./<%= file.name %>.html'),
                controller: '<%= file.nameCamel %>ModalController',
                windowClass: '<%=file.name%>',
                resolve: {
                    // you can add some extra resolves here
                }
            };
        });
    })

    .controller('<%= file.nameCamel %>ModalController', function ($scope, $modalInstance) {
        $scope.ok = function () {
            $modalInstance.close('reason');
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });