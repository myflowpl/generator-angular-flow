import * as angular from 'angular';
require('./<%= file.name %>.scss');

/**
 * <%= name.nameLowCamel %>
 */
angular.module('<%= module.name %>')
.component('<%= name.nameLowCamel %>', {
    template: require('./<%= file.name %>.html'),
    controller: '<%= file.nameCamel %>',
    bindings: {

    }
})

class <%= file.nameCamel %> {

    static $inject = ['$scope'];
    constructor(private scope){}

    $onInit() {

    }

    // $onDestroy() { }
    // $onChanges() { }
    // $doCheck() { }
    // $postLink() { }
}

angular.module('<%= module.name %>').controller('<%= file.nameCamel %>', <%= file.nameCamel %>);
