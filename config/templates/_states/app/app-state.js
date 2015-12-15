/**
 * app-state state
 */
require('./app-state.scss');

angular.module('app')
    .config(function ($stateProvider) {
        $stateProvider.state('app', {
            url: '',
            abstract:true,
            views: {
                "": {
                    template: require('./app-state.html'),
                    controller: 'AppStateController'
                }
            }
        });
    })
    .controller('AppStateController', function ($scope) {

    });
