'use strict';
require('./error-state.scss');

angular.module('app')
    /**
     * this state is special and it has to be included as the last one in order to handle unknow routes (code 404)
     */
    .config(function ($stateProvider) {
        $stateProvider.state('error', {
            url: '^*path',
            controller: 'errorState',
            template: require('./error-state.html')
        });
    })
    .controller('errorState', function ($scope) {

    });
