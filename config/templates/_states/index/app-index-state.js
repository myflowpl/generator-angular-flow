/**
 * app-index-state state
 */
require('./app-index-state.scss');

angular.module('app')
    .config(function ($stateProvider) {

        $stateProvider.state('app.index', {
            url: '/',
            views: {
                "": {
                    template: require('./app-index-state.html'),
                    controller: 'AppIndexStateController'
                }
            }
        });
    })
    .controller('AppIndexStateController', function ($scope) {

    });
