/**
 * <%=file.name%> state
 */
require('./<%= file.name %>.scss');

angular.module('<%= module.name %>')
    .config(function ($stateProvider) {
        $stateProvider.state('<%= state.name %>', {
            url: '<%= state.url %>',<%= parentStr %>
            views: {
                "": {
                    template: require('./<%= file.name %>.html'),
                    controller: '<%= file.nameCamel %>Controller'
                }
            }
        });
    })
    .controller('<%= file.nameCamel %>Controller', function ($scope) {

    });
