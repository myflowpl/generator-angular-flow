'use strict';

require('./<%= file.name %>.scss');

angular.module('<%= module.name %>')

    .config(function($modalsProvider){
        $modalsProvider.register('<%= name.name %>', function(params, config){
            return {
                template: require('./<%= file.name %>.html'),
                controller: '<%= file.nameCamel %>Controller',
                windowClass: '<%=file.name%>',
                resolve: {
                    // you can add some extra resolves here
                }
            };
        });
    })

    .controller('<%= file.nameCamel %>Controller', function ($scope, $uibModalInstance) {
        $scope.ok = function () {
            $uibModalInstance.close('reason');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });