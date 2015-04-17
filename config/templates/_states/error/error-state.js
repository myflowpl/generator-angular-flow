'use strict';

angular.module('config')
    /**
     * this state is special and it has to be included as the last one in order to handle unknow routes (code 404)
     */
    .config(function ($stateProvider) {
        $stateProvider.state('error', {
            //url: '^*path',
            controller: 'errorState',
            templateUrl: 'config/_states/error/error-state.html'
        });
    })
    .controller('errorState', function ($scope) {

    });
