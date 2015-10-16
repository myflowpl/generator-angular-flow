/**
 * <%=file.name%> component
 */
require('./<%= file.name %>.scss'),

angular.module('<%= module.name %>')

    .directive('<%= file.nameLowCamel %>', function () {
        return {
            restrict: 'E',
            replace:false,
            template: require('./<%= file.name %>.html'),
            controller: '<%= file.nameCamel %>Controller'
        };
    })

    .controller('<%= file.nameCamel %>Controller', function ($scope) {

    });