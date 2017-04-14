import * as angular from 'angular';
require('./<%= file.name %>.scss');

angular.module('<%= module.name %>')

    .config(function($modalsProvider){
        $modalsProvider.register('<%= name.name %>', function(params, config){
            return {
                template: require('./<%= file.name %>.html'),
                controller: '<%= file.nameCamel %>',
                controllerAs: '$ctrl',
                windowClass: '<%=file.dir%>-modal',
                resolve: {
                    // you can add some extra resolves here
                }
            };
        });
    });

class <%= file.nameCamel %> {

    static $inject = ['$scope', '$uibModalInstance', 'params']
    constructor (private $scope, private modal, private params: any) {  }

    ok () {
        this.modal.close('reason');
    }

    cancel () {
        this.modal.dismiss('cancel');
    }
}

angular.module('<%= module.name %>').controller('<%= file.nameCamel %>', <%= file.nameCamel %>);