'use strict';

require('./<%= file.name %>.scss');

angular.module('<%= module.name %>')

    .run(function($modalsProvider){
        $modalsProvider.register('<%= modalName %>', function(){
            return {
                template: require('./<%= file.name %>.html'),
                controller: '<%= file.nameCamel %>ModalController',
                windowClass: '<%=file.name%>',
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