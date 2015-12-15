/**
 * app-index-state state
 */
require('./index-state.scss');

angular.module('app')
    .config(function ($stateProvider) {

        $stateProvider.state('index', {
            url: '/',
            parent: 'app',
            views: {
                "": {
                    template: require('./index-state.html'),
                    controller: 'IndexStateController'
                }
            }
        });
    })
    .controller('IndexStateController', function ($scope) {

    });
