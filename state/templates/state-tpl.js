/**
 * <%=file.name%> state
 */
require('./<%= file.name %>.scss');

angular.module('<%= module.name %>')
    .config(function ($stateProvider) {
        $stateProvider.state('<%= state.name %>', {
            url: '<%= state.url %>',
            views: {
                "": {
                    template: require('./<%= file.name %>.html'),
                    controller: '<%= file.nameCamel %>StateController'
                }
            }
        });
    })
    .controller('<%= file.nameCamel %>StateController', function ($scope) {

    });
