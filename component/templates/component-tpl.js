/**
 * <%=file.name%> component
 */
require('./<%= name.name %>.scss');

angular.module('<%= module.name %>')

    .directive('<%= name.nameLowCamel %>', function () {
        return {
            restrict: 'E',
            replace:false,
            template: require('./<%= name.name %>.html'),
            controller: '<%= name.nameCamel %>Controller'
        };
    })

    .controller('<%= name.nameCamel %>Controller', function ($scope) {

    });
