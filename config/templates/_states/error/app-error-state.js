'use strict';
require('./app-error-state.scss');

angular.module('app')
    /**
     * this state is special and it has to be included as the last one in order to handle unknow routes (code 404)
     */
    .config(function ($stateProvider) {
        $stateProvider.state('app.error', {
            url: '/error-404',
            controller: 'AppErrorStateController',
            template: require('./app-error-state.html')
        });
    })
    .controller('AppErrorStateController', function ($scope) {

    });
